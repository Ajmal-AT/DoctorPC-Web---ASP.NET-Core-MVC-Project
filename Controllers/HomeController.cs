using DoctorPC_Web.Data;
using DoctorPC_Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Diagnostics.Metrics;
using System.Xml.Linq;

namespace DoctorPC_Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private readonly DoctorPC_WebContext _context;

        public HomeController(ILogger<HomeController> logger, DoctorPC_WebContext context)
        {
            _context = context;
            _logger = logger;
        }

        public IActionResult Index()
        {
            string name = HttpContext.Session.GetString("email");
            if (string.IsNullOrEmpty(name))
            {
                return RedirectToAction("Login", "users");
            }
            else
            {
                return View();
            }
        }

        public IActionResult IndexX()
        {
            string name = HttpContext.Session.GetString("email");
            if(name == "Admin")
            {
                return RedirectToAction("Index", "users");
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
            
        }

        public IActionResult Guide()
        {
            return View();
        }
        public IActionResult Help() 
        {
            return View();
        }

        public IActionResult Track()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }


        public async Task<IActionResult> upgrade()
        {
            return _context.product != null ?
                        View(await _context.product.ToListAsync()) :
                        Problem("Entity set 'DoctorPC_WebContext.product'  is null.");
        }


        //add to card
        public IActionResult Card()
        {
            string name = HttpContext.Session.GetString("email"); 
            if(name == null) 
            {
                return RedirectToAction("Login", "users");
            }
            return View();
        }




        // POST: card/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        private static int total = 0;
        public static int count;
        private int maxContity;

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Card(String cname , string price)
        {
            
            string name = HttpContext.Session.GetString("email");

            if (string.IsNullOrEmpty(name))
            {
                // Handle the case where 'name' is null or empty
                return RedirectToAction("Login" , "users"); // Or return an error view
            }
            else
            {
                try
                {
                    using (SqlConnection connection = new SqlConnection("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=C:\\Users\\Ajmal A T\\Desktop\\DoctorPC-Web\\Doctor.mdf;Integrated Security=True;Connect Timeout=30"))
                    {
                        await connection.OpenAsync();
                        string sql = "SELECT * FROM [cards] WHERE username=@Email";

                        using (SqlCommand command = new SqlCommand(sql, connection))
                        {
                            command.Parameters.AddWithValue("@Email", name);

                            using (SqlDataReader reader = await command.ExecuteReaderAsync())
                            {
                                if (reader.Read())
                                {
                                    
                                    count = Convert.ToInt32(HttpContext.Session.GetString("count"));
                                    count += 1;
                                    
                                    String counti = count.ToString();
                                    HttpContext.Session.SetString("count", counti);
                                    
                                    cards ca = new cards();
                                    ca.username = name;
                                    ca.contity = count;
                                    ca.cprice = price;
                                    ca.cname = cname;
                                    _context.Add(ca);
                                    await _context.SaveChangesAsync();
                                    
                                    return RedirectToAction(nameof(upgrade));
                                }
                                else
                                {
                                    count = Convert.ToInt32(HttpContext.Session.GetString("count"));
                                    count += 1;

                                    String counti = count.ToString();

                                   

                                    HttpContext.Session.SetString("count", counti);
                                    cards ca = new cards();
                                    ca.username = name;
                                    ca.contity = count;
                                    ca.cprice = price;
                                    ca.cname = cname;
                                    _context.Add(ca);
                                    await _context.SaveChangesAsync();
                                    return RedirectToAction(nameof(upgrade));
                                }
                            }
                        }
                    }
                }
                catch (Exception ex)
                { 
                    return RedirectToAction(nameof(Index)); 
                }
            }

        }

        //view my card

        public async Task<ActionResult> ViewMyCart()
        {
            string name = HttpContext.Session.GetString("email");

            if (string.IsNullOrEmpty(name))
            {
                return RedirectToAction("Login", "users");
            }
            else
            {
                 var cards = await _context.cards.Where(c => c.username == name ).ToListAsync();

                return View(cards);
            }
        }


        //delete card 
        // GET: card/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.cards == null)
            {
                return NotFound();
            }
            string name = HttpContext.Session.GetString("email");
            if (string.IsNullOrEmpty(name))
            {
                return RedirectToAction("Login", "users");

            }
            else
            {
                var cards = await _context.cards.Where(c => c.username == name && c.cid == id).ToListAsync();
                return View(cards);
            }

        }

        // POST: card/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            string name = HttpContext.Session.GetString("email");
            if (_context.cards == null)
            {
                return Problem("Entity set 'DoctorPC_WebContext.card' is null.");
            }
            var card = await _context.cards.FirstOrDefaultAsync(c => c.cid == id && c.username == name);
            if (card != null)
            {
                _context.cards.Remove(card);
                await _context.SaveChangesAsync();
                using (SqlConnection connection = new SqlConnection("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=C:\\Users\\Ajmal A T\\Desktop\\DoctorPC-Web\\Doctor.mdf;Integrated Security=True;Connect Timeout=30"))
                {
                    await connection.OpenAsync();
                    string sql1 = "SELECT max(contity)  FROM [cards] WHERE username=@Email";

                    using (SqlCommand command = new SqlCommand(sql1, connection))
                    {
                        command.Parameters.AddWithValue("@Email", name);

                        object result = await command.ExecuteScalarAsync();

                        if (result != null && result != DBNull.Value)
                        {
                            maxContity = Convert.ToInt32(result);
                        }
                        else
                        {
                            maxContity = 0;
                        }
                    }
                }


            }
            string cou = maxContity.ToString();
            HttpContext.Session.SetString("count", cou);
            return RedirectToAction("ViewMyCart", "Home");
        }


        //logout
        
        public ActionResult LogOut()
        {
            HttpContext.Session.Clear();
            TempData["Message"] = "Thank you ! Visit Again";
            return RedirectToAction("Login", "users"); // Redirect to a different action or view
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}