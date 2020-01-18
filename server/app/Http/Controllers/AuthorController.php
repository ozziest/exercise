<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAuthor;
use App\Http\Requests\PaginateAuthor;
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
     * Store a new author.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(StoreAuthor $request)
    {
        $author = $this->authorRepository->create($request->input('author'));
        $this->bookRepository->create($author, $request->input('book'));
        return $this->authorRepository->find($author->id);
    }

    /**
     * Fetching all authors
     *
     * @return Response
     */
    public function index(PaginateAuthor $request)
    {
        return $this->authorRepository->paginate(
            $request->input('order_by', 'id'),
            $request->input('order_type', 'ASC')
        );
    }
}
