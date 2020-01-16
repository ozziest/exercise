<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAuthor;
use App\Repositories\AuthorRepository;
use App\Repositories\BookRepository;

class AuthorController extends Controller
{
    /**
     * The author repository implementation.
     *
     * @var AuthorRepository
     */
    protected $authorRepository;    

    /**
     * The book repository implementation.
     *
     * @var BookRepository
     */
    protected $bookRepository;

    public function __construct(AuthorRepository $authorRepository, BookRepository $bookRepository)
    {
        $this->authorRepository = $authorRepository;
        $this->bookRepository = $bookRepository;
    }

    /**
     * Store a new user.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(StoreAuthor $request)
    {
        $author = $this->authorRepository->create($request->input('author'));
        $this->bookRepository->create($author, $request->input('book'));
    }
}
