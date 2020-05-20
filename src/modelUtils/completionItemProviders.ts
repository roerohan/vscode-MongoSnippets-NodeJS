import vscode from 'vscode';
import { getFieldNames } from './getModelNames';

export default async function (
    models: { [key: string]: { file: string } },
): Promise<vscode.Disposable[]> {
    const fieldNames = await getFieldNames(models);

    const modelNameCompletionProvider = (
        language: string,
    ): vscode.Disposable => vscode.languages.registerCompletionItemProvider({
        scheme: 'file',
        language,
    }, {
        provideCompletionItems() {
            const items: vscode.CompletionItem[] = [];

            Object.keys(models).forEach((model) => {
                const complete = new vscode.CompletionItem(model, vscode.CompletionItemKind.Field);

                complete.commitCharacters = ['.'];
                complete.detail = `Press '.' to complete ${model}`;
                complete.documentation = new vscode.MarkdownString(
                    `**Mongo Snippets: Model Name Suggestion - \`${model}.\`**`,
                );

                items.push(complete);
            });
            return items;
        },
    });

    const dotFieldNameCompletionProvider = (
        language: string,
    ): vscode.Disposable => vscode.languages.registerCompletionItemProvider({
        scheme: 'file',
        language,
    }, {
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
            const items: vscode.CompletionItem[] = [];

            Object.keys(models).forEach((model) => {
                const linePrefix = document.lineAt(position).text.substr(0, position.character);
                if (!linePrefix.endsWith(`${model}.`)) {
                    return;
                }
                fieldNames.forEach((field) => {
                    const complete = new vscode.CompletionItem(
                        field,
                        vscode.CompletionItemKind.Field,
                    );

                    complete.documentation = new vscode.MarkdownString(
                        `**Mongo Snippets: Field Name Suggestion - \`${field}\`**`,
                    );
                    items.push(complete);
                });
            });
            return items;
        },
    },
    '.');

    const objectFieldNameCompletionProvider = (
        language: string,
    ): vscode.Disposable => vscode.languages.registerCompletionItemProvider({
        scheme: 'file',
        language,
    }, {
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
            // get field names
            const items: vscode.CompletionItem[] = [];
            const startPos = document.positionAt(0);

            const preText = document.getText(new vscode.Range(startPos, position));
            const openbraces = preText.split('{').length - 1;
            const closedbraces = preText.split('}').length - 1;

            if (openbraces <= closedbraces) {
                return items;
            }

            const linePrefix = document.lineAt(position).text.substr(0, position.character);
            if (linePrefix.endsWith('{')) {
                return items;
            }

            fieldNames.forEach((field) => {
                const complete = new vscode.CompletionItem(
                    field,
                    vscode.CompletionItemKind.Field,
                );

                complete.documentation = new vscode.MarkdownString(
                    `**Mongo Snippets: Field Name Suggestion - \`${field}\`**`,
                );
                items.push(complete);
            });
            return items;
        },
    },
    '{');

    return [
        modelNameCompletionProvider('javascript'),
        modelNameCompletionProvider('typescript'),

        dotFieldNameCompletionProvider('javascript'),
        dotFieldNameCompletionProvider('typescript'),

        objectFieldNameCompletionProvider('javascript'),
        objectFieldNameCompletionProvider('typescript'),
    ];
}
