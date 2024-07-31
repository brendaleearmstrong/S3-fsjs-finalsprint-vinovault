const dal = require("./p.db");

// async function getKeywordsByLoginId(id) {
//   // WHY add this feature. You are working for free
//   let SQL = `SELECT keyword_id AS _id, username, password, email FROM public."Logins" WHERE id = $1`;
//   try {
//     let results = await dal.query(SQL, [id]);
//     return results.rows[0];
//   } catch (error) {
//     console.log(error);
//   } 
// };

async function addKeyword(login_id, keywords, source, hits) {
  let SQL = `INSERT INTO public."keywords"(login_id, keywords, data_source, hit_count)
    VALUES ($1, $2, $3, $4) RETURNING keyword_id;`
  try {
    let results = await dal.query(SQL, [login_id, keywords, source, hits]);
    return results.rows[0].keyword_id;
  } catch (error) {
    console.log(error);
  } 
};

module.exports = {
//    getKeywordsByLoginId,
    addKeyword,
  }