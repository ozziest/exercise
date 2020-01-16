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
     * A basic test example.
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

        // // Calling the controller
        $controller = new AuthorController($authorRepository, $bookRepository);
        $controller->store($request);
        $this->assertTrue(true);
    }
}
