using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class TodoItemsController : ControllerBase
{
    private readonly TodoContext _context;

    public TodoItemsController(TodoContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
    {
        return await _context.TodoItems.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TodoItem>> GetTodoItem(long id)
    {
        var todoItem = await _context.TodoItems.FindAsync(id);
        if (todoItem == null)
        {
            return NotFound();
        }
        return todoItem;
    }

    [HttpPost]
    public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
    {
        _context.TodoItems.Add(todoItem);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetTodoItem), new { id = todoItem.Id }, todoItem);
    }

[HttpPut("{id}")]
public async Task<IActionResult> PutTodoItem(long id, TodoItemUpdateModel updateModel)
{
    var existingTodoItem = await _context.TodoItems.FindAsync(id);
    if (existingTodoItem == null)
    {
        return NotFound();
    }

    existingTodoItem.IsComplete = updateModel.IsComplete;

    await _context.SaveChangesAsync();

    return NoContent();
}
     [HttpDelete("{id}")]
     public async Task<IActionResult> DeleteTodoItem(long id)
     {
         var todoItem = await _context.TodoItems.FindAsync(id);
         if (todoItem == null)
         {
             return NotFound();
         }

         _context.TodoItems.Remove(todoItem);
         await _context.SaveChangesAsync();

         return NoContent();
     }
 }
 