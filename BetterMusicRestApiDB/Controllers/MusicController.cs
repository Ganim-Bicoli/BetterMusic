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
    public class MusicController : ApiController
    {
        private BetterMusicEntities db = new BetterMusicEntities();

        // GET: api/Music
        public IQueryable<MusicTable> GetMusicTable()
        {
            
            return db.MusicTable;
        }

        // GET: api/Music/5
        [ResponseType(typeof(MusicTable))]
        public IHttpActionResult GetMusicTable(string id)
        {

            MusicTable musicTable = (MusicTable)db.MusicTable.Where(x => x.ArtName == id).FirstOrDefault();
            if (musicTable == null)
            {
                return NotFound();
            }

            return Ok(musicTable);
        }

        // PUT: api/Music/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMusicTable(int id, MusicTable musicTable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != musicTable.Id)
            {
                return BadRequest();
            }

            db.Entry(musicTable).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MusicTableExists(id))
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

        // POST: api/Music
        [ResponseType(typeof(MusicTable))]
        public IHttpActionResult PostMusicTable(MusicTable musicTable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.MusicTable.Add(musicTable);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = musicTable.Id }, musicTable);
        }

        // DELETE: api/Music/5
        [ResponseType(typeof(MusicTable))]
        public IHttpActionResult DeleteMusicTable(int id)
        {
            MusicTable musicTable = db.MusicTable.Find(id);
            if (musicTable == null)
            {
                return NotFound();
            }

            db.MusicTable.Remove(musicTable);
            db.SaveChanges();

            return Ok(musicTable);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MusicTableExists(int id)
        {
            return db.MusicTable.Count(e => e.Id == id) > 0;
        }
    }
}