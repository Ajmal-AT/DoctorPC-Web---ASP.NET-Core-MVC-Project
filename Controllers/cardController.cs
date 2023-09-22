using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using DoctorPC_Web.Data;
using DoctorPC_Web.Models;
using Microsoft.AspNetCore.Http;

namespace DoctorPC_Web.Controllers
{
    public class cardController : Controller
    {
        private readonly DoctorPC_WebContext _context;

        public cardController(DoctorPC_WebContext context)
        {
            _context = context;
        }

        // GET: card
        public async Task<IActionResult> Index()
        {
              return _context.cards != null ? 
                          View(await _context.cards.ToListAsync()) :
                          Problem("Entity set 'DoctorPC_WebContext.card'  is null.");
        }

        // GET: card/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.cards == null)
            {
                return NotFound();
            }

            var card = await _context.cards
                .FirstOrDefaultAsync(m => m.cid == id);
            if (card == null)
            {
                return NotFound();
            }

            return View(card);
        }

        // GET: card/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: card/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("cid,cname,cprice,contity,username")] cards cards)
        {
            if (ModelState.IsValid)
            {
                _context.Add(cards);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(cards);
        }

        // GET: card/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.cards == null)
            {
                return NotFound();
            }

            var card = await _context.cards.FindAsync(id);
            if (card == null)
            {
                return NotFound();
            }
            return View(card);
        }

        // POST: card/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("cid,cname,cprice,contity,username")] cards cards)
        {
            if (id != cards.cid)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(cards);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!cardExists(cards.cid))
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
            return View(cards);
        }

        // GET: card/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.cards == null)
            {
                return NotFound();
            }

            var card = await _context.cards
                .FirstOrDefaultAsync(m => m.cid == id);
            if (card == null)
            {
                return NotFound();
            }

            return View(card);
        }

        // POST: card/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.cards == null)
            {
                return Problem("Entity set 'DoctorPC_WebContext.card'  is null.");
            }
            var card = await _context.cards.FindAsync(id);
            if (card != null)
            {
                _context.cards.Remove(card);
            }
            int co = 0;
            string cou = co.ToString();
            HttpContext.Session.SetString("count", cou);
            await _context.SaveChangesAsync();
            return RedirectToAction("ViewMyCart", "Home");
        }

        private bool cardExists(int id)
        {
          return (_context.cards?.Any(e => e.cid == id)).GetValueOrDefault();
        }
    }
}
