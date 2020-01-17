<?php

namespace App\Repositories;

use App\Author;

class AuthorRepository
{
    /**
     * AuthorRepository constructor.
     * 
     * @param Author $author
     */
    public function __construct(Author $author)
    {
        $this->model = $author;
    }

    /**
     * Creating a new author
     * 
     * @param array $data
     * @return Author
     */
    public function create($data) : Author
    {
        return $this->model->create($data);
    }

    /**
     * Finding the author with full related data
     * 
     * @param int $id
     * @return Author
     */
    public function find($id) : Author
    {
        return $this
            ->model
            ->where('id', $id)
            ->with('books')
            ->first();
    }
}
