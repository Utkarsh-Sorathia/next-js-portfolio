import { parseMarkdownToHtml } from '../src/utils/markdown';

async function test() {
  try {
    const html = await parseMarkdownToHtml('# Hello World\n\nThis is a **test**.');
    console.log('HTML:', html);
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
