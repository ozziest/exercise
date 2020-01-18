<?php

namespace Tests\Unit\Controllers;

use PHPUnit\Framework\TestCase;
use Mockery;
use App\Http\Controllers\AuthorController;
use App\Author;
use App\Book;

class AuthorControllerTest extends TestCase
{

    /**
     * Store method test
     *
     * @return void
     */
    public function testStore()
    {
        $author = new Author();
        $author->id = 1;

        $book = new Book();
        $book->id = 100;
        $book->author_id = 1;

        $authorData = [
            'name' => 'Karl Popper',
            'age' => 92,
            'address' => 'Vienna'
        ];
        $bookData = [
            'name' => 'Karl Popper',
            'release_date' => '1959-07-28'
        ];

        $authorRepository = Mockery::mock('App\Repositories\AuthorRepository');
        $authorRepository
            ->shouldReceive('create')
            ->with($authorData)
            ->andReturn($author);

        $authorRepository
            ->shouldReceive('find')
            ->with(1)
            ->andReturn($author);

        $bookRepository = Mockery::mock('App\Repositories\BookRepository');
        $bookRepository
            ->shouldReceive('create')
            ->with($author, $bookData)
            ->andReturn($book);

        // Mocking HTTP request
        $request = Mockery::mock('App\Http\Requests\StoreAuthor');
        $request
            ->shouldReceive('input')
            ->with('author')
            ->andReturn($authorData);

        $request
            ->shouldReceive('input')
            ->with('book')
            ->andReturn($bookData);

        $response = Mockery::mock('Symfony\Component\HttpFoundation\Response');
        $request
            ->shouldReceive('json')
            ->andReturn('my-response-result');

        // // Calling the controller
        $controller = new AuthorController($authorRepository, $bookRepository);
        $result = $controller->store($request, $response);
        $this->assertEquals($result->id, $author->id);
    }

    /**
     * Paginate method test
     *
     * @return void
     */
    public function testAll()
    {
        $result = Mockery::mock('Illuminate\Pagination\LengthAwarePaginator');
        $authorRepository = Mockery::mock('App\Repositories\AuthorRepository');
        $authorRepository
            ->shouldReceive('paginate')
            ->with()
            ->andReturn($result);

        $bookRepository = Mockery::mock('App\Repositories\BookRepository');

        $controller = new AuthorController($authorRepository, $bookRepository);
        $this->assertEquals($result, $controller->index());
    }    
}
