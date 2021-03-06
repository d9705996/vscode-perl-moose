/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import * as vscode from 'vscode'
import * as path from 'path'

export let doc: vscode.TextDocument
export let editor: vscode.TextEditor
export let documentEol: string
export let platformEol: string

/**
 * Activates the torrentalle.perl-moose extension
 */
export async function activate(docUri: vscode.Uri) {
  
  // The extensionId is `publisher.name` from package.json
  const ext = vscode.extensions.getExtension('torrentalle.perl-moose')
  await ext.activate()
  try {
    doc = await vscode.workspace.openTextDocument(docUri)
    editor = await vscode.window.showTextDocument(doc)
    //await sleep(2000) // Wait for server activation
  } catch (e) {
    console.error(e)
  }
}

/**
 * Open Document
 */
export async function openDocument(docUri: vscode.Uri) {
  doc = await vscode.workspace.openTextDocument(docUri)
  editor = await vscode.window.showTextDocument(doc)

  await sleep(2000) // Wait for server activation
}


async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const getFixturePath = (p: string) => {
  return path.resolve(__dirname, '../../testFixture', p)
}
export const getFixtureUri = (p: string) => {
  return vscode.Uri.file(getFixturePath(p))
}

export async function setTestContent(content: string): Promise<boolean> {
  const all = new vscode.Range(doc.positionAt(0), doc.positionAt(doc.getText().length))
  return editor.edit(eb => eb.replace(all, content))
}
