<?php

namespace App\Repositories;

use Illuminate\Pagination\LengthAwarePaginator;
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

    /**
     * Fetching all authors with full related data
     * 
     * @param string $orderBy
     * @param string $orderType
     * @return LengthAwarePaginator
     */
    public function paginate($orderBy, $orderType) : LengthAwarePaginator
    {
        return $this
            ->model
            ->with('books')
            ->orderBy($orderBy, $orderType)
            ->paginate(10);
    }
}
