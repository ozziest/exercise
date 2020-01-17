<?php

namespace Tests\Unit\Controllers;

use PHPUnit\Framework\TestCase;
use Mockery;
use App\Repositories\AuthorRepository;
use App\Author;

class AuthorRepositoryTest extends TestCase
{

    /**
     * Creating method test
     *
     * @return void
     */
    public function testCreate()
    {
        $result = new Author();
        $result->id = 1;

        $data = [
            'name' => 'Karl Popper',
            'age' => 92,
            'address' => 'Vienna'
        ];
        $model = Mockery::mock('App\Author');
        $model
            ->shouldReceive('create')
            ->times(1)
            ->with($data)
            ->andReturn($result);

        $repository = new AuthorRepository($model);
        $this->assertEquals($result->id, $repository->create($data)->id);
    }

    /**
     * Find method test
     *
     * @return void
     */
    public function testFind()
    {
        $result = new Author();
        $result->id = 1;

        $data = [
            'name' => 'Karl Popper',
            'age' => 92,
            'address' => 'Vienna'
        ];
        $model = Mockery::mock('App\Author');
        $model
            ->shouldReceive('where->with->first')
            ->times(1)
            ->andReturn($result);

        $repository = new AuthorRepository($model);
        $this->assertEquals($result->id, $repository->find(1)->id);
    }
}
