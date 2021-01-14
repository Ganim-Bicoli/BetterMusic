using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using BetterMusicRestApiDB;

namespace BetterMusicRestApiDB.Controllers
{
    public class LoginController : ApiController
    {
        private BetterMusicEntities db = new BetterMusicEntities();

        // GET: api/Login
        public IQueryable<UserLoginCred> GetUserLoginCred()
        {
            return db.UserLoginCred;
        }

        // GET: api/Login/5
        [ResponseType(typeof(UserLoginCred))]
        public IHttpActionResult GetUserLoginCred(int id)
        {
            UserLoginCred userLoginCred = db.UserLoginCred.Find(id);
            if (userLoginCred == null)
            {
                return NotFound();
            }

            return Ok(userLoginCred);
        }

        // GET: api/Login/5
        [ResponseType(typeof(UserLoginCred))]
        public IHttpActionResult GetUserLoginCred(string id)
        {
            UserLoginCred userLoginCred = db.UserLoginCred.Find(id);
            if (userLoginCred == null)
            {
                return NotFound();
            }

            return Ok(userLoginCred);
        }

        // PUT: api/Login/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUserLoginCred(int id, UserLoginCred userLoginCred)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userLoginCred.Id)
            {
                return BadRequest();
            }

            db.Entry(userLoginCred).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserLoginCredExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Login
        [ResponseType(typeof(UserLoginCred))]
        public IHttpActionResult PostUserLoginCred(UserLoginCred userCredIn)
        {
            UserLoginCred userLoginCred = (UserLoginCred)db.UserLoginCred.Where(x => x.Username == userCredIn.Username && x.Password == userCredIn.Password).FirstOrDefault();
            if (userLoginCred == null)
            {
                return NotFound();
            }

            return Ok(userLoginCred);
        }

        // DELETE: api/Login/5
        [ResponseType(typeof(UserLoginCred))]
        public IHttpActionResult DeleteUserLoginCred(int id)
        {
            UserLoginCred userLoginCred = db.UserLoginCred.Find(id);
            if (userLoginCred == null)
            {
                return NotFound();
            }

            db.UserLoginCred.Remove(userLoginCred);
            db.SaveChanges();

            return Ok(userLoginCred);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserLoginCredExists(int id)
        {
            return db.UserLoginCred.Count(e => e.Id == id) > 0;
        }
    }
}