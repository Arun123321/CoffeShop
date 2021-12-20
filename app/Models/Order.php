<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
  protected $appends = ['items'];
     public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
        // note: we can also include comment model like: 'App\Models\Comment'
    }
 public function getItemsAttribute()
    {
        return $this->orderItems;
    }
    public function getPaymentAttribute($value)
    {
    	if($value=='pod')
    	{
    		$value='Pay On Delivery';
    	}
        return ucfirst($value);
    }
    public function getStatusAttribute($value)
    {
    	if($value==0)
    	{
    		$value='Pending';
    	}
    	if($value==1)
    	{
    		$value='Shiped';
    	}
    		if($value==2)
    	{
    		$value='Delivered';
    	}
    		if($value==3)
    	{
    		$value='Canceled';
    	}
        return ucfirst($value);
    }
}
