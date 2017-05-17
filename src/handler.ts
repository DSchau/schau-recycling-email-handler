import { send } from './util/send';

export async function email(ev, context, callback) {
  const response = await send(ev.body)
    .catch(e => callback(e));
  
  return callback(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(response)
  });
}
