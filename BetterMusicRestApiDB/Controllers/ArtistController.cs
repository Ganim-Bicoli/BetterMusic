using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BetterMusicRestApiDB.Controllers
{
    public class ArtistController : ApiController
    {
        // GET: api/Artist
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Artist/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Artist
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Artist/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Artist/5
        public void Delete(int id)
        {
        }
    }
}
