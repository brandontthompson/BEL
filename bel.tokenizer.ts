type Token = {
    type:TokenType
    value:string
    // startOffset:number
    // endOffset:number
    // lineNumber:number
}


enum TokenType {
    WHITESPACE,
    IDENTIFIER,
    INTEGER_LITERAL,
    STRING_LITERAL,
    OPERATOR,

}


const tokenMatrix:any[][] = [
    // comments
    [/^\/\/.*/, 'COMMENT', TokenType.WHITESPACE],
    //[/^\/\*[\s\S]*?\*\//, null],

    // symbols, delimiters
    [/^;/, ';', TokenType.OPERATOR],
    [/^:/, ':', TokenType.OPERATOR],
    [/^\{/, '{', TokenType.OPERATOR],
    [/^\}/, '}', TokenType.OPERATOR],
    [/^\(/, '(', TokenType.OPERATOR],
    [/^\)/, ')', TokenType.OPERATOR],
    [/^\[/, '[', TokenType.OPERATOR],
    [/^\]/, ']', TokenType.OPERATOR],

    [/^=/, '=', TokenType.OPERATOR],
    [/^==/, '==', TokenType.OPERATOR],

    [/^\d+/, 'NUMBER', TokenType.INTEGER_LITERAL],
    [/^"[^"]*"/, 'STRING', TokenType.STRING_LITERAL],
    [/^'[^']*'/, 'STRING', TokenType.STRING_LITERAL],

];

class Tokenizer {

    private _string:string;
    private _cursor:number;

    constructor(string:string){
        this._string = string;
        this._cursor = 0;
    }

    hasTokens(){
        return this._cursor < this._string.length;
    }

    _match(regexp:RegExp, string:string):any | null{
        const match = regexp.exec(string);
        if(match == null) return null

        this._cursor += match[0].length;
        return match[0];
    }

    public getNextToken():Token[] | null{

        if(!this.hasTokens()) return null;

        const tokens:Token[] = [];
        this._cursor;

        const string:string = this._string.slice(this._cursor);


        for (const [expression, tokenLabel, tokenType] of tokenMatrix) {    
            const tokenValue = this._match(expression, string);

            if(tokenValue == null) continue;

            // re-write so its not recursive 
            if(tokenType === TokenType.WHITESPACE) return this.getNextToken();

            tokens.push({
                type: tokenType,
                value: tokenValue
            });

        }
        

        return tokens;
    }
}