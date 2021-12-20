<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use Validator;
use Illuminate\Validation\Rule;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       
        $users = User::all();
  return response()->json(['message' => 'Success','data'=>$users]);
    }
  /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function get($id)
    {
        $user = User::find($id);
  return response()->json(['message' => 'Success','data'=>$user]);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {

        $user = User::find($request->id);
         $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            Rule::unique('users', 'email')->ignore($user)
        ]);
 if($validator->fails()){
              $errors='';
            foreach ($validator->errors()->getMessages() as $key => $value) {
//$errors+=$errors.$value.',';
              $errors .=ucfirst($key).'-'.$value[0].' ,';
            }

           return response()->json($errors, 422);
        }
       

$user->name = $request->name;
$user->email = $request->email;
if($user->save())
{

     return response()->json(['message' => 'Success']);
}
else
{
     return response()->json(['message' => 'Error'],422);
}

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
       
        $user = User::find($request->id);
        if($user!==null && $user->is_admin!==1)
        {
        if($user->delete())
{

     return response()->json(['message' => 'Success']);
}
else
{
     return response()->json(['message' => 'Error'],422);
}
    }
    else
    {
        return response()->json(['message' => 'Cant delete admin'],422);
    }
}
}
