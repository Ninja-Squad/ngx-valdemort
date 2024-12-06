import"./chunk-Q7L6LLAK.js";var e=Object.freeze(JSON.parse(`{"displayName":"Cairo","name":"cairo","patterns":[{"begin":"(<)(\\\\[)","beginCaptures":{"1":{"name":"punctuation.brackets.angle.cairo"},"2":{"name":"punctuation.brackets.square.cairo"}},"comment":"boxed slice literal","end":">","endCaptures":{"0":{"name":"punctuation.brackets.angle.cairo"}},"patterns":[{"include":"#block-comments"},{"include":"#comments"},{"include":"#gtypes"},{"include":"#lvariables"},{"include":"#punctuation"},{"include":"#types"}]},{"captures":{"1":{"name":"storage.type.cairo"},"2":{"name":"entity.name.module.cairo"}},"comment":"modules","match":"(mod)\\\\s+([a-z][A-Za-z0-9_]*)"},{"begin":"\\\\b(use)\\\\s","beginCaptures":{"1":{"name":"keyword.other.cairo"}},"comment":"use statements","end":";","endCaptures":{"0":{"name":"punctuation.semi.cairo"}},"name":"meta.use.cairo","patterns":[{"include":"#block-comments"},{"include":"#comments"},{"include":"#keywords"},{"include":"#namespaces"},{"include":"#punctuation"},{"include":"#types"},{"include":"#lvariables"}]},{"include":"#block-comments"},{"include":"#comments"},{"include":"#attributes"},{"include":"#lvariables"},{"include":"#constants"},{"include":"#gtypes"},{"include":"#functions"},{"include":"#types"},{"include":"#keywords"},{"include":"#macros"},{"include":"#namespaces"},{"include":"#punctuation"},{"include":"#strings"},{"include":"#variables"}],"repository":{"attributes":{"begin":"(#)(!?)(\\\\[)","beginCaptures":{"1":{"name":"punctuation.definition.attribute.cairo"},"3":{"name":"punctuation.brackets.attribute.cairo"}},"comment":"attributes","end":"\\\\]","endCaptures":{"0":{"name":"punctuation.brackets.attribute.cairo"}},"name":"meta.attribute.cairo","patterns":[{"include":"#block-comments"},{"include":"#comments"},{"include":"#keywords"},{"include":"#punctuation"},{"include":"#strings"},{"include":"#gtypes"},{"include":"#types"}]},"block-comments":{"patterns":[{"comment":"empty block comments","match":"/\\\\*\\\\*/","name":"comment.block.cairo"},{"begin":"/\\\\*\\\\*","comment":"block documentation comments","end":"\\\\*/","name":"comment.block.documentation.cairo","patterns":[{"include":"#block-comments"}]},{"begin":"/\\\\*(?!\\\\*)","comment":"block comments","end":"\\\\*/","name":"comment.block.cairo","patterns":[{"include":"#block-comments"}]}]},"comments":{"patterns":[{"captures":{"1":{"name":"punctuation.definition.comment.cairo"}},"comment":"documentation comments","match":"(///).*$","name":"comment.line.documentation.cairo"},{"captures":{"1":{"name":"punctuation.definition.comment.cairo"}},"comment":"line comments","match":"(//).*$","name":"comment.line.double-slash.cairo"}]},"constants":{"patterns":[{"comment":"ALL CAPS constants","match":"\\\\b[A-Z]{2}[A-Z0-9_]*\\\\b","name":"constant.other.caps.cairo"},{"captures":{"1":{"name":"storage.type.cairo"},"2":{"name":"constant.other.caps.cairo"}},"comment":"constant declarations","match":"\\\\b(const)\\\\s+([A-Z][A-Za-z0-9_]*)\\\\b"},{"captures":{"1":{"name":"punctuation.separator.dot.decimal.cairo"},"2":{"name":"keyword.operator.exponent.cairo"},"3":{"name":"keyword.operator.exponent.sign.cairo"},"4":{"name":"constant.numeric.decimal.exponent.mantissa.cairo"},"5":{"name":"entity.name.type.numeric.cairo"}},"comment":"decimal integers and floats","match":"\\\\b\\\\d[\\\\d_]*(\\\\.?)[\\\\d_]*(?:(E|e)([+-]?)([\\\\d_]+))?(f32|f64|i128|i16|i32|i64|i8|isize|u128|u16|u32|u64|u8|usize)?\\\\b","name":"constant.numeric.decimal.cairo"},{"captures":{"1":{"name":"entity.name.type.numeric.cairo"}},"comment":"hexadecimal integers","match":"\\\\b0x[\\\\da-fA-F_]+(i128|i16|i32|i64|i8|isize|u128|u16|u32|u64|u8|usize)?\\\\b","name":"constant.numeric.hex.cairo"},{"captures":{"1":{"name":"entity.name.type.numeric.cairo"}},"comment":"octal integers","match":"\\\\b0o[0-7_]+(i128|i16|i32|i64|i8|isize|u128|u16|u32|u64|u8|usize)?\\\\b","name":"constant.numeric.oct.cairo"},{"captures":{"1":{"name":"entity.name.type.numeric.cairo"}},"comment":"binary integers","match":"\\\\b0b[01_]+(i128|i16|i32|i64|i8|isize|u128|u16|u32|u64|u8|usize)?\\\\b","name":"constant.numeric.bin.cairo"},{"comment":"booleans","match":"\\\\b(true|false)\\\\b","name":"constant.language.bool.cairo"}]},"escapes":{"captures":{"1":{"name":"constant.character.escape.backslash.cairo"},"2":{"name":"constant.character.escape.bit.cairo"},"3":{"name":"constant.character.escape.unicode.cairo"},"4":{"name":"constant.character.escape.unicode.punctuation.cairo"},"5":{"name":"constant.character.escape.unicode.punctuation.cairo"}},"comment":"escapes: ASCII, byte, Unicode, quote, regex","match":"(\\\\\\\\)(?:(?:(x[0-7][\\\\da-fA-F])|(u(\\\\{)[\\\\da-fA-F]{4,6}(\\\\}))|.))","name":"constant.character.escape.cairo"},"functions":{"patterns":[{"captures":{"1":{"name":"keyword.other.cairo"},"2":{"name":"punctuation.brackets.round.cairo"}},"comment":"pub as a function","match":"\\\\b(pub)(\\\\()"},{"begin":"\\\\b(fn)\\\\s+([A-Za-z0-9_]+)((\\\\()|(<))","beginCaptures":{"1":{"name":"keyword.other.fn.cairo"},"2":{"name":"entity.name.function.cairo"},"4":{"name":"punctuation.brackets.round.cairo"},"5":{"name":"punctuation.brackets.angle.cairo"}},"comment":"function definition","end":"\\\\{|;","endCaptures":{"0":{"name":"punctuation.brackets.curly.cairo"}},"name":"meta.function.definition.cairo","patterns":[{"include":"#block-comments"},{"include":"#comments"},{"include":"#keywords"},{"include":"#lvariables"},{"include":"#constants"},{"include":"#gtypes"},{"include":"#functions"},{"include":"#macros"},{"include":"#namespaces"},{"include":"#punctuation"},{"include":"#strings"},{"include":"#types"},{"include":"#variables"}]},{"begin":"([A-Za-z0-9_]+)(\\\\()","beginCaptures":{"1":{"name":"entity.name.function.cairo"},"2":{"name":"punctuation.brackets.round.cairo"}},"comment":"function/method calls, chaining","end":"\\\\)","endCaptures":{"0":{"name":"punctuation.brackets.round.cairo"}},"name":"meta.function.call.cairo","patterns":[{"include":"#block-comments"},{"include":"#comments"},{"include":"#attributes"},{"include":"#keywords"},{"include":"#lvariables"},{"include":"#constants"},{"include":"#gtypes"},{"include":"#functions"},{"include":"#macros"},{"include":"#namespaces"},{"include":"#punctuation"},{"include":"#strings"},{"include":"#types"},{"include":"#variables"}]},{"begin":"([A-Za-z0-9_]+)(?=::<.*>\\\\()","beginCaptures":{"1":{"name":"entity.name.function.cairo"}},"comment":"function/method calls with turbofish","end":"\\\\)","endCaptures":{"0":{"name":"punctuation.brackets.round.cairo"}},"name":"meta.function.call.cairo","patterns":[{"include":"#block-comments"},{"include":"#comments"},{"include":"#attributes"},{"include":"#keywords"},{"include":"#lvariables"},{"include":"#constants"},{"include":"#gtypes"},{"include":"#functions"},{"include":"#lifetimes"},{"include":"#macros"},{"include":"#namespaces"},{"include":"#punctuation"},{"include":"#strings"},{"include":"#types"},{"include":"#variables"}]}]},"gtypes":{"patterns":[{"comment":"option types","match":"\\\\b(Some|None)\\\\b","name":"entity.name.type.option.cairo"},{"comment":"result types","match":"\\\\b(Ok|Err)\\\\b","name":"entity.name.type.result.cairo"}]},"interpolations":{"captures":{"1":{"name":"punctuation.definition.interpolation.cairo"},"2":{"name":"punctuation.definition.interpolation.cairo"}},"comment":"curly brace interpolations","match":"({)[^\\"{}]*(})","name":"meta.interpolation.cairo"},"keywords":{"patterns":[{"comment":"control flow keywords","match":"\\\\b(break|continue|do|else|for|if|loop|match|return|try|while|yield)\\\\b","name":"keyword.control.cairo"},{"comment":"storage keywords","match":"\\\\b(extern|let|macro|mod)\\\\b","name":"keyword.other.cairo storage.type.cairo"},{"comment":"const keyword","match":"\\\\b(const)\\\\b","name":"storage.modifier.cairo"},{"comment":"type keyword","match":"\\\\b(type)\\\\b","name":"keyword.declaration.type.cairo storage.type.cairo"},{"comment":"enum keyword","match":"\\\\b(enum)\\\\b","name":"keyword.declaration.enum.cairo storage.type.cairo"},{"comment":"trait keyword","match":"\\\\b(trait)\\\\b","name":"keyword.declaration.trait.cairo storage.type.cairo"},{"comment":"struct keyword","match":"\\\\b(struct)\\\\b","name":"keyword.declaration.struct.cairo storage.type.cairo"},{"comment":"storage modifiers","match":"\\\\b(ref|static)\\\\b","name":"storage.modifier.cairo"},{"comment":"other keywords","match":"\\\\b(as|dyn|move|impl|implicits|in|nopanic|of|priv|pub|static_assert|typeof|unsafe|use|where|with)\\\\b","name":"keyword.other.cairo"},{"comment":"fn","match":"\\\\bfn\\\\b","name":"keyword.other.fn.cairo"},{"comment":"crate","match":"\\\\bcrate\\\\b","name":"keyword.other.crate.cairo"},{"comment":"mut","match":"\\\\bmut\\\\b","name":"storage.modifier.mut.cairo"},{"comment":"logical operators","match":"(\\\\^|\\\\||\\\\|\\\\||&&|<<|>>|!)(?!=)","name":"keyword.operator.logical.cairo"},{"comment":"logical AND, borrow references","match":"&(?![&=])","name":"keyword.operator.borrow.and.cairo"},{"comment":"assignment operators","match":"(\\\\+=|-=|\\\\*=|/=|%=|\\\\^=|&=|\\\\|=|<<=|>>=)","name":"keyword.operator.assignment.cairo"},{"comment":"single equal","match":"(?<![<>])=(?!=|>)","name":"keyword.operator.assignment.equal.cairo"},{"comment":"comparison operators","match":"(=(=)?(?!>)|!=|<=|(?<!=)>=)","name":"keyword.operator.comparison.cairo"},{"comment":"math operators","match":"(([+%]|(\\\\*(?!\\\\w)))(?!=))|(-(?!>))|(/(?!/))","name":"keyword.operator.math.cairo"},{"captures":{"1":{"name":"punctuation.brackets.round.cairo"},"2":{"name":"punctuation.brackets.square.cairo"},"3":{"name":"punctuation.brackets.curly.cairo"},"4":{"name":"keyword.operator.comparison.cairo"},"5":{"name":"punctuation.brackets.round.cairo"},"6":{"name":"punctuation.brackets.square.cairo"},"7":{"name":"punctuation.brackets.curly.cairo"}},"comment":"less than, greater than (special case)","match":"(?:\\\\b|(?:(\\\\))|(\\\\])|(\\\\})))[ \\\\t]+([<>])[ \\\\t]+(?:\\\\b|(?:(\\\\()|(\\\\[)|(\\\\{)))"},{"comment":"namespace operator","match":"::","name":"keyword.operator.namespace.cairo"},{"captures":{"1":{"name":"keyword.operator.desnap.cairo"}},"comment":"desnap","match":"(\\\\*)(?=\\\\w+)"},{"comment":"snap","match":"@","name":"keyword.operator.snap.cairo"},{"comment":"dot access","match":"\\\\.(?!\\\\.)","name":"keyword.operator.access.dot.cairo"},{"comment":"ranges, range patterns","match":"\\\\.{2}(=|\\\\.)?","name":"keyword.operator.range.cairo"},{"comment":"colon","match":":(?!:)","name":"keyword.operator.key-value.cairo"},{"comment":"dashrocket, skinny arrow","match":"->","name":"keyword.operator.arrow.skinny.cairo"},{"comment":"hashrocket, fat arrow","match":"=>","name":"keyword.operator.arrow.fat.cairo"},{"comment":"dollar macros","match":"\\\\$","name":"keyword.operator.macro.dollar.cairo"},{"comment":"question mark operator, questionably sized, macro kleene matcher","match":"\\\\?","name":"keyword.operator.question.cairo"}]},"lvariables":{"patterns":[{"comment":"super","match":"\\\\bsuper\\\\b","name":"variable.language.super.cairo"}]},"macros":{"patterns":[{"captures":{"2":{"name":"entity.name.function.macro.cairo"},"3":{"name":"entity.name.type.macro.cairo"}},"comment":"macros","match":"(([a-z_][A-Za-z0-9_]*!)|([A-Z_][A-Za-z0-9_]*!))","name":"meta.macro.cairo"}]},"namespaces":{"patterns":[{"captures":{"1":{"name":"entity.name.namespace.cairo"},"2":{"name":"keyword.operator.namespace.cairo"}},"comment":"namespace (non-type, non-function path segment)","match":"(?<![A-Za-z0-9_])([A-Za-z0-9_]+)((?<!super)::)"}]},"punctuation":{"patterns":[{"comment":"comma","match":",","name":"punctuation.comma.cairo"},{"comment":"curly braces","match":"[{}]","name":"punctuation.brackets.curly.cairo"},{"comment":"parentheses, round brackets","match":"[()]","name":"punctuation.brackets.round.cairo"},{"comment":"semicolon","match":";","name":"punctuation.semi.cairo"},{"comment":"square brackets","match":"[\\\\[\\\\]]","name":"punctuation.brackets.square.cairo"},{"comment":"angle brackets","match":"(?<!=)[<>]","name":"punctuation.brackets.angle.cairo"}]},"strings":{"patterns":[{"begin":"(\\")","beginCaptures":{"1":{"name":"punctuation.definition.string.bytearray.cairo"}},"comment":"double-quoted byte array strings","end":"\\"","endCaptures":{"0":{"name":"punctuation.definition.string.bytearray.cairo"}},"name":"string.quoted.double.cairo","patterns":[{"include":"#escapes"},{"include":"#interpolations"}]},{"begin":"(')","beginCaptures":{"1":{"name":"punctuation.definition.string.short.cairo"}},"comment":"single-quoted short strings","end":"'","endCaptures":{"0":{"name":"punctuation.definition.string.short.cairo"}},"name":"string.quoted.single.cairo","patterns":[{"include":"#escapes"},{"include":"#interpolations"}]}]},"types":{"patterns":[{"captures":{"1":{"name":"entity.name.type.numeric.cairo"}},"comment":"numeric types","match":"(?<![A-Za-z])(felt252|i8|i16|i32|i64|i128|u8|u16|u32|u64|u128|u256|u512)\\\\b"},{"begin":"\\\\b(_?[A-Z][A-Za-z0-9_]*)(<)","beginCaptures":{"1":{"name":"entity.name.type.cairo"},"2":{"name":"punctuation.brackets.angle.cairo"}},"comment":"parameterized types","end":">","endCaptures":{"0":{"name":"punctuation.brackets.angle.cairo"}},"patterns":[{"include":"#block-comments"},{"include":"#comments"},{"include":"#keywords"},{"include":"#lvariables"},{"include":"#punctuation"},{"include":"#types"},{"include":"#variables"}]},{"comment":"primitive types","match":"\\\\b(bool|never)\\\\b","name":"entity.name.type.primitive.cairo"},{"captures":{"1":{"name":"keyword.declaration.trait.cairo storage.type.cairo"},"2":{"name":"entity.name.type.trait.cairo"}},"comment":"trait declarations","match":"\\\\b(trait)\\\\s+(_?[A-Z][A-Za-z0-9_]*)\\\\b"},{"captures":{"1":{"name":"keyword.declaration.struct.cairo storage.type.cairo"},"2":{"name":"entity.name.type.struct.cairo"}},"comment":"struct declarations","match":"\\\\b(struct)\\\\s+(_?[A-Z][A-Za-z0-9_]*)\\\\b"},{"captures":{"1":{"name":"keyword.declaration.enum.cairo storage.type.cairo"},"2":{"name":"entity.name.type.enum.cairo"}},"comment":"enum declarations","match":"\\\\b(enum)\\\\s+(_?[A-Z][A-Za-z0-9_]*)\\\\b"},{"captures":{"1":{"name":"keyword.declaration.type.cairo storage.type.cairo"},"2":{"name":"entity.name.type.declaration.cairo"}},"comment":"type declarations","match":"\\\\b(type)\\\\s+(_?[A-Z][A-Za-z0-9_]*)\\\\b"},{"comment":"types","match":"\\\\b_?[A-Z][A-Za-z0-9_]*\\\\b(?!!)","name":"entity.name.type.cairo"}]},"variables":{"patterns":[{"comment":"variables","match":"\\\\b(?<!(?<!\\\\.)\\\\.)[a-z0-9_]+\\\\b","name":"variable.other.cairo"}]}},"scopeName":"source.cairo"}`)),a=[e];export{a as default};
