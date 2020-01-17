<?php

namespace Tests\Unit\Controllers;

use PHPUnit\Framework\TestCase;
use Mockery;
use App\Repositories\BookRepository;
use App\Author;
use App\Book;

class BookRepositoryTest extends TestCase
{

    /**
     * Create method test
     *
     * @return void
     */
    public function testCreate()
    {
        $author = new Author();
        $author->id = 1;

        $book = new Book();
        $book->author_id = 1;
        $book->id = 100;

        $data = [
            'name' => 'Karl Popper',
            'release_date' => '1959-07-28'
        ];
        $model = Mockery::mock('App\Book');
        $model
            ->shouldReceive('create')
            ->times(1)
            ->with([
                'name' => 'Karl Popper',
                'release_date' => '1959-07-28',
                'author_id' => 1
            ])
            ->andReturn($book);
        
        $repository = new BookRepository($model);
        $result = $repository->create($author, $data);

        $this->assertEquals($book->id, $result->id);
        $this->assertEquals($book->author_id, $result->author_id);
    }
}
