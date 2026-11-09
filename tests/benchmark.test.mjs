import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {renderWorkspace, escapeHtml} from '../scripts/build.mjs';

const workspace = JSON.parse(await readFile(new URL('../workspace.json', import.meta.url), 'utf8'));

test('renderWorkspace benchmark', () => {
  const start = process.hrtime.bigint();
  for (let i = 0; i < 1000; i++) {
    renderWorkspace(workspace);
  }
  const end = process.hrtime.bigint();
  const timeMs = Number(end - start) / 1000000;
  console.log(`renderWorkspace 1000 times took ${timeMs.toFixed(2)}ms`);

  // Basic threshold to ensure it's not pathologically slow. Should easily complete within 1 second.
  assert.ok(timeMs < 1000, `renderWorkspace took too long: ${timeMs}ms`);
});

test('escapeHtml benchmark', () => {
  const sampleText = 'This is a <sample> text with "quotes" and & ampersands to escape.';
  const start = process.hrtime.bigint();
  for (let i = 0; i < 10000; i++) {
    escapeHtml(sampleText);
  }
  const end = process.hrtime.bigint();
  const timeMs = Number(end - start) / 1000000;
  console.log(`escapeHtml 10000 times took ${timeMs.toFixed(2)}ms`);

  // Basic threshold. Should easily complete within 1 second.
  assert.ok(timeMs < 1000, `escapeHtml took too long: ${timeMs}ms`);
});