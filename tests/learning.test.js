import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { filterModules, findMaterialResults } from '../src/lib/materialSearch.js'
import { isPrivilegedSupabaseKey, isPublicSupabaseConfig } from '../src/lib/supabaseConfig.js'

const materials = JSON.parse(readFileSync(new URL('../src/data/materiData.json', import.meta.url)))
const quizzes = JSON.parse(readFileSync(new URL('../src/data/quizData.json', import.meta.url)))

test('pencarian menemukan judul, subtopik, dan kata yang berbeda kapitalisasi', () => {
  assert.equal(filterModules(materials.modules, '  GENETIKA  ')[0].id, 'mod-2')
  assert.ok(filterModules(materials.modules, 'mosaik cair').some(mod => mod.id === 'mod-1'))
  assert.equal(filterModules(materials.modules, 'tidak-ada-xyz').length, 0)
  assert.equal(filterModules(materials.modules, '   ').length, materials.modules.length)
})

test('hasil subtopik mengarah ke modul dan subtopik yang benar', () => {
  const result = findMaterialResults(materials.modules, 'Organel Sel')[0]
  assert.equal(result.to, '/materi/mod-1?topik=sub-1-2')
  assert.equal(findMaterialResults(materials.modules, ' ').length, 0)
})

test('setiap modul memiliki kuis dan jumlah subtopik yang sesuai', () => {
  for (const mod of materials.modules) {
    assert.ok(quizzes.quizzes.some(quiz => quiz.moduleId === mod.id), mod.title)
    assert.equal(mod.totalSubtopics, mod.subtopics.length, mod.title)
  }
})

test('media materi lokal tersedia dan jawaban kuis valid', () => {
  for (const mod of materials.modules) {
    for (const sub of mod.subtopics) {
      for (const block of sub.content || []) {
        if (block.src && !/^(https?:|data:)/.test(block.src)) {
          assert.ok(existsSync(new URL(`../public/${block.src.replace(/^\/+/, '')}`, import.meta.url)), block.src)
        }
      }
    }
  }
  for (const quiz of quizzes.quizzes) {
    assert.ok(quiz.questions.length > 0, quiz.id)
    for (const question of quiz.questions) {
      assert.ok(Number.isInteger(question.correctIndex) && question.correctIndex >= 0 && question.correctIndex < question.options.length, question.id)
    }
  }
})

test('konfigurasi browser menolak placeholder, URL rusak, dan kunci server', () => {
  const serverJwt = `header.${btoa(JSON.stringify({ role: 'service_role' }))}.signature`
  const anonJwt = `header.${btoa(JSON.stringify({ role: 'anon' }))}.signature`
  assert.equal(isPrivilegedSupabaseKey(serverJwt), true)
  assert.equal(isPrivilegedSupabaseKey('sb_secret_example'), true)
  assert.equal(isPublicSupabaseConfig('https://school.supabase.co', serverJwt), false)
  assert.equal(isPublicSupabaseConfig('https://school.supabase.co', 'sb_secret_example'), false)
  assert.equal(isPublicSupabaseConfig('invalid-url', anonJwt), false)
  assert.equal(isPublicSupabaseConfig('https://school.supabase.co', 'your-anon-public-key-here'), false)
  assert.equal(isPublicSupabaseConfig('https://your-project-id.supabase.co', anonJwt), false)
  assert.equal(isPublicSupabaseConfig('https://school.supabase.co', anonJwt), true)
  assert.equal(isPublicSupabaseConfig('https://school.supabase.co', 'sb_publishable_example'), true)
})
