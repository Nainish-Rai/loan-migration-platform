# PL/SQL grammar

`PlSqlLexer.g4` and `PlSqlParser.g4` are vendored from antlr/grammars-v4 with their licence, at a pinned commit.

`antlr-ng` generates the TypeScript parser into `../generated/` (gitignored) during `nx build`. No Java is needed.
