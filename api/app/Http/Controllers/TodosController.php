<?php

namespace App\Http\Controllers;

use App\Todo;
use Illuminate\Http\Request;

class TodosController extends Controller
{
    /**
     * @return mixed
     */
    public function index()
    {
        return Todo::orderBy('deleted_at', 'desc')
            ->oldest()
            ->get();
    }

    /**
     * @param \Illuminate\Http\Request $request
     *
     * @return mixed
     */
    public function store(Request $request)
    {
        return Todo::create($request->only('task'))->fresh();
    }

    /**
     * @param \App\Todo $todo
     *
     * @return \App\Todo
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();

        return $todo;
    }
}
