<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Validator;
use Str;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     * 
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register','refresh']]);
    }
 
    /** 
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request){
		//auth('api')->logout();
    	$validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required|string|min:4',
        ]);

        if ($validator->fails()) {
             $errors='';
            foreach ($validator->errors()->getMessages() as $key => $value) {
//$errors+=$errors.$value.',';
                $errors .=ucfirst($key).',';
            }

           return response()->json($errors.' are required', 422);
        }

        if (! $token = auth('api')->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->createNewToken($token);
    }

    
	
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'password' => 'required|string|min:6',
			'email'=> 'required|unique:users'
        ]);

        if($validator->fails()){
              $errors='';
            foreach ($validator->errors()->getMessages() as $key => $value) {
//$errors+=$errors.$value.',';
              $errors .=ucfirst($key).'-'.$value[0].' ,';
            }

           return response()->json($errors, 422);
        }

        $user = User::create(array_merge(
                    $validator->validated(),
                    ['password' => bcrypt($request->password),'type'=>1,'account_status'=>4]
                ));
				


       // return response()->json([
          //  'message' => 'User successfully registered',
         //   'user' => $user
     //   ], 201);
	 if (! $token = auth('api')->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
	  return $this->createNewToken($token);
    }


    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        auth('api')->logout();

        return response()->json(['message' => 'User successfully signed out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
		 $newToken =auth('api')->parseToken()->refresh();
           return response()->json([
            'access_token' => $newToken,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
			
        ]);
		
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile() {
		$user = Auth::guard('api')->user();
		$primaryAddresses = $user ->addresses()->isPrimary()->get(['id','place','state','city','postal_code','latitude','longitude','postal_code','is_primary','is_billing','is_shipping','type'])->first();
		$user->primary_address=$primaryAddresses;
		//print_r($primaryAddresses);
        return response()->json($user);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
            'user' => auth('api')->user(),
			
        ]);
    }




}