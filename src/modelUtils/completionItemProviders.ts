import vscode from 'vscode';

export default function (
    modelNames: {
        label: string;
        detail: string;
    }[],
    fieldnames: string[],
) {
    const provider1 = vscode.languages.registerCompletionItemProvider({
        scheme: 'file',
        language: 'javascript',
    }, {
        provideCompletionItems() {
            const items: vscode.CompletionItem[] = [];
            modelNames.forEach((model) => {
                const modelname = model.label.split(' ')[1];
                const complete = new vscode.CompletionItem(modelname);
                complete.commitCharacters = ['.'];
                complete.kind = vscode.CompletionItemKind.Field;
                complete.detail = `Press '.' to get ${modelname}`;
                complete.documentation = new vscode.MarkdownString(
                    `**Mongo Snippets: Model Name Suggestion - \`${modelname}.\`**`,
                );
                items.push(complete);
            });
            return items;
        },
    });

    // to complete after `modelNames.`
    const provider2 = vscode.languages.registerCompletionItemProvider({
        scheme: 'file',
        language: 'javascript',
    }, {
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
            const items: vscode.CompletionItem[] = [];
            modelNames.forEach((model) => {
                const modelname = model.label.split(' ')[1];
                const linePrefix = document.lineAt(position).text.substr(0, position.character);
                if (!linePrefix.endsWith(`${modelname}.`)) {
                    return;
                }
                fieldnames.forEach((field) => {
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

    // to complete within {}
    const provider3 = vscode.languages.registerCompletionItemProvider({
        scheme: 'file',
        language: 'javascript',
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

            fieldnames.forEach((field) => {
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

    return [provider1, provider2, provider3];
}