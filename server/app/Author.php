<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'authors';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'age', 'address'];

    /**
     * Get the books of author.
     */
    public function books()
    {
        return $this->hasMany('App\Book');
    }
}
