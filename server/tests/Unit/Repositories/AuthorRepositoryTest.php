<?php

namespace Tests\Unit\Controllers;

use PHPUnit\Framework\TestCase;
use Mockery;
use App\Repositories\AuthorRepository;
use App\Author;

class AuthorRepositoryTest extends TestCase
{

    /**
     * A basic test example.
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
}
