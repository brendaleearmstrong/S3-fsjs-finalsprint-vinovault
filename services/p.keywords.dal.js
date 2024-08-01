const dal = require("./p.db");

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