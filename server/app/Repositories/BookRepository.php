<?php

namespace App\Repositories;

use App\Author;
use App\Book;

class BookRepository
{
    /**
     * BookRepository constructor.
     * 
     * @param Book $book
     */
    public function __construct(Book $book)
    {
        $this->model = $book;
    }

    /**
     * Creating a new book with an author
     * 
     * @param Author $author
     * @param array  $data
     * @return Book
     */
    public function create(Author $author, $data) : Book
    {
        $data['author_id'] = $author->id;
        return $this->model->create($data);
    }
}
