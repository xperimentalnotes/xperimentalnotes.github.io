const NetlifyAPI = require('netlify')

exports.handler = async function (event, context) {
  const client = new NetlifyAPI(process.env.NETLIFY_API_ACCESS_TOKEN)

  const submissions = await client
    .listSiteSubmissions({
      site_id: process.env.SITE_ID,
    })
    .catch((e) => console.log('Error getting submissions', e))

  if (submissions.length) {
    for (i = 0; i < submissions.length; i++) {
      await client.deleteSubmission({ submission_id: submissions[i].id })
    }
    return {
      statusCode: 200,
      body: 'Submissions deleted',
    }
  } else {
    return {
      statusCode: 200,
      body: 'No submissions to delete',
    }
  }
}