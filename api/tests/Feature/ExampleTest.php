<?php

namespace Tests\Feature;

use App\Todo;
use Carbon\Carbon;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ExampleTest extends TestCase
{
    use DatabaseMigrations;

    public function testCanCreateTodo()
    {
        $response = $this->postJson('/todos', [
            'task' => 'Lorem ipsum',
        ]);

        $response->assertStatus(200);
    }

    public function testCanListTodos()
    {
        $todo = factory(Todo::class)->create();

        $response = $this->getJson('/todos');

        $response->assertStatus(200);
        $response->assertJson([
            'data' => [
                ['id' => $todo->id],
            ],
        ]);
    }

    public function testCanDeleteTodo()
    {
        $todo = factory(Todo::class)->create();

        $response = $this->deleteJson("/todos/{$todo->id}");

        $response->assertStatus(200);
        $response->assertJson([
            'id' => $todo->id,
        ]);
        $response->assertJson([
            'deleted_at' => Carbon::now()->toDateTimeString(),
        ]);
    }
}
