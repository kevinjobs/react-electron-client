const db = require('../../datastore');
const { dialog } = require('electron');
const fs = require('fs');

async function readBank (event, bankName) {
  /**
   * read the question bank
   * @method readBank
   * @param {event} event
   * @param {string} bankName the name of question bank
   * @return {void}
   */
  let bankPath;

  if (bankName === null) {
    const result = await dialog.showOpenDialog({
      title: '打开题库',
      properties: [
        'openFile'
      ],
      filters: [{
        name: 'Json',
        extensions: ['json']
      }]
    });
    if (result && !result.canceled) {
      bankPath = result.filePaths[0];
    }
  } else if (bankName === 'default') {
    bankPath = 'data.json';
  }

  fs.readFile(bankPath, 'utf-8', (err, data) => {
    if (err) console.error(err);
    else {
      event.reply('bank-read-reply', bankPath, JSON.parse(data));
    };
  })
}

async function readByTitle(event, type, title) {
  /**
   * read the question by title with type
   * @method readByTitle
   * @param {string} type the type of question: subject | chapter | section
   * @param {string} title the title of the question's type
   * @return {void}
   */
  let result;

  switch (type) {
    case 'subject':
      result = db.get('questions')
                  .filter({subject: {title: title}})
                  .take(15)
                  .value();
      break;
    case 'chapter':
      result = db.get('questions')
                  .filter({chapter: {title: title}})
                  .take(15)
                  .value();
      break;
    case 'section':
      result = db.get('questions')
                  .filter({section: {title: title}})
                  .take(15)
                  .value();
      break;
    default:
      break;
  }
  event.reply('ques-read-by-title-reply', result);
}

module.exports = {
  readBank,
  readByTitle
}