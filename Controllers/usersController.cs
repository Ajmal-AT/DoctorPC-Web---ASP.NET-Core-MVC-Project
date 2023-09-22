using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using DoctorPC_Web.Data;
using DoctorPC_Web.Models;
using Microsoft.Data.SqlClient;
using System.Xml.Linq;
using System.Text.RegularExpressions;

namespace DoctorPC_Web.Controllers
{
    public class usersController : Controller
    {
        private readonly DoctorPC_WebContext _context;

        public usersController(DoctorPC_WebContext context)
        {
            _context = context;
        }

        // GET: users
        public async Task<IActionResult> Index()
        {
            string name = HttpContext.Session.GetString("email");
            if (string.IsNullOrEmpty(name))
            {
                return RedirectToAction("Login", "users");
            }
            else
            {
                return _context.user != null ?
                              View(await _context.user.ToListAsync()) :
                              Problem("Entity set 'DoctorPC_WebContext.user'  is null.");
            }
        }

         public IActionResult  Login()
        {
            return View();
        }
        public static int maxContity = 0;
        [HttpPost, ActionName("Login")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(String email, String password)
        {
            if (email == "admin@gmail.com" && password == "admin")
            {
                string name = "Admin";
                HttpContext.Session.SetString("name", name);
                HttpContext.Session.SetString("email", name);
                return RedirectToAction("Index","users");
            }


            else
            {
                using (SqlConnection con1 = new SqlConnection("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=C:\\Users\\Ajmal A T\\Desktop\\DoctorPC-Web\\Doctor.mdf;Integrated Security=True;Connect Timeout=30"))
                {
                    string sql = "select * from [user] where email=@Email and password=@Password";
                    con1.Open();
                    using (SqlCommand con = new SqlCommand(sql, con1))
                    {
                        con.Parameters.AddWithValue("@Email", email);
                        con.Parameters.AddWithValue("@Password", password);

                        using (SqlDataReader reader = con.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                if (!reader.IsDBNull(reader.GetOrdinal("email")))
                                {
                                    string name = reader["name"].ToString();
                                    string emai = reader["email"].ToString();
                                    try
                                    {
                                        using (SqlConnection connection = new SqlConnection("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=C:\\Users\\Ajmal A T\\Desktop\\DoctorPC-Web\\Doctor.mdf;Integrated Security=True;Connect Timeout=30"))
                                        {
                                            await connection.OpenAsync();
                                            string sql1 = "SELECT max(contity)  FROM [card] WHERE username=@Email";

                                            using (SqlCommand command = new SqlCommand(sql1, connection))
                                            {
                                                command.Parameters.AddWithValue("@Email", email);

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
                                    catch
                                    {
                                        maxContity = 0;
                                    }


                                   
                                    string id = maxContity.ToString();
                                    
                                    HttpContext.Session.SetString("name", name);
                                    HttpContext.Session.SetString("email", email);
                                    HttpContext.Session.SetString("count", id);

                                    return RedirectToAction("Index", "Home");

                                }
                                else
                                {
                                    TempData["Message"] = "email id null!";
                                    ViewData["message"] = "email id null";
                                    return View();
                                }
                            }
                            else
                            {
                                TempData["Message"] = "wrong user name or password!";
                                ViewData["message"] = "wrong user name or password";
                                return View();
                            }
                        }
                    }
                }
            }
        }


        // GET: users/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.user == null)
            {
                return NotFound();
            }

            var user = await _context.user
                .FirstOrDefaultAsync(m => m.uid == id);
            if (user == null)
            {
                return NotFound();
            }

            return View(user);
        }

        // GET: users/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: users/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("uid,name,email,numb,password,cpassword")] user user)
        {
            if (ValidateMobileNumber(user.numb))
            {
                _context.Add(user);
                await _context.SaveChangesAsync();
                TempData["Message"] = "Registeration successfully completed!";
                return RedirectToAction(nameof(Login));
            }
            else
            {
                ViewData["message"] = "invalid phone number";
                return View();
            }



        }

        private bool ValidateMobileNumber(string number)
        {
            if (number != "")
            {
                // Indian mobile number format: XXXXXXXXXX or 0XXXXXXXXX
                string pattern = @"^(0|\+91)?[6789]\d{9}$";
                return Regex.IsMatch(number, pattern);
            }
            else
            {
                // Handle other countries or return false for unsupported countries
                return false;
            }
        }

        // GET: users/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.user == null)
            {
                return NotFound();
            }

            var user = await _context.user.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return View(user);
        }

        // POST: users/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("uid,name,email,numb,password,cpassword")] user user)
        {
            if (id != user.uid)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(user);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!userExists(user.uid))
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
            return View(user);
        }

        // GET: users/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.user == null)
            {
                return NotFound();
            }

            var user = await _context.user
                .FirstOrDefaultAsync(m => m.uid == id);
            if (user == null)
            {
                return NotFound();
            }

            return View(user);
        }

        // POST: users/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.user == null)
            {
                return Problem("Entity set 'DoctorPC_WebContext.user'  is null.");
            }
            var user = await _context.user.FindAsync(id);
            if (user != null)
            {
                _context.user.Remove(user);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool userExists(int id)
        {
          return (_context.user?.Any(e => e.uid == id)).GetValueOrDefault();
        }
    }
}
