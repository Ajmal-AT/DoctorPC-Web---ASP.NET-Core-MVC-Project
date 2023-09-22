using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using DoctorPC_Web.Data;
using DoctorPC_Web.Models;

namespace DoctorPC_Web.Controllers
{
    public class productController : Controller
    {
        private readonly DoctorPC_WebContext _context;

        public productController(DoctorPC_WebContext context)
        {
            _context = context;
        }

        // GET: product
        public async Task<IActionResult> Index()
        {
              return _context.product != null ? 
                          View(await _context.product.ToListAsync()) :
                          Problem("Entity set 'DoctorPC_WebContext.product'  is null.");
        }

        // GET: product/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.product == null)
            {
                return NotFound();
            }

            var product = await _context.product
                .FirstOrDefaultAsync(m => m.pid == id);
            if (product == null)
            {
                return NotFound();
            }

            return View(product);
        }

        // GET: product/Create
        public IActionResult Create()
        {
            
                return View();
            
            
        }

        // POST: product/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(IFormFile file,[Bind("pid,pname,price")] product product)
        {
            
            if (file != null)
            {
                string filename = file.FileName;
                //string ext = Path.GetExtension(file.FileName);
                string path = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot\\images"));
                using (var filestream = new FileStream(Path.Combine(path, filename), FileMode.Create))
                {
                    await file.CopyToAsync(filestream);
                }
                product.imgfile = filename;
            }
            _context.Add(product);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
           
        }

        // GET: product/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.product == null)
            {
                return NotFound();
            }

            var product = await _context.product.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return View(product);
        }

        // POST: product/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("pid,pname,price,username,imgfile")] product product)
        {
            if (id != product.pid)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(product);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!productExists(product.pid))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(product);
        }

        // GET: product/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.product == null)
            {
                return NotFound();
            }

            var product = await _context.product
                .FirstOrDefaultAsync(m => m.pid == id);
            if (product == null)
            {
                return NotFound();
            }

            return View(product);
        }

        // POST: product/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.product == null)
            {
                return Problem("Entity set 'DoctorPC_WebContext.product'  is null.");
            }
            var product = await _context.product.FindAsync(id);
            if (product != null)
            {
                _context.product.Remove(product);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool productExists(int id)
        {
          return (_context.product?.Any(e => e.pid == id)).GetValueOrDefault();
        }
    }
}
