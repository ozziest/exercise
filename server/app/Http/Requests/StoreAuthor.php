<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAuthor extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'author.name' => 'required|max:50',
            'author.age' => 'required|numeric|between:0,120',
            'author.address' => 'required|max:255',
            'book.name' => 'required|max:50',
            'book.release_date' => 'required|date',
        ];
    }
}
