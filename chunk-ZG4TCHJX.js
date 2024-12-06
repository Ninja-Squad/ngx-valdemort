import"./chunk-Q7L6LLAK.js";var e=Object.freeze(JSON.parse('{"displayName":"Makefile","name":"make","patterns":[{"include":"#comment"},{"include":"#variables"},{"include":"#variable-assignment"},{"include":"#directives"},{"include":"#recipe"},{"include":"#target"}],"repository":{"another-variable-braces":{"patterns":[{"begin":"(?<={)(?!})","end":"(?=}|((?<!\\\\\\\\)\\\\n))","name":"variable.other.makefile","patterns":[{"include":"#variables"},{"match":"\\\\\\\\\\\\n","name":"constant.character.escape.continuation.makefile"}]}]},"another-variable-parentheses":{"patterns":[{"begin":"(?<=\\\\()(?!\\\\))","end":"(?=\\\\)|((?<!\\\\\\\\)\\\\n))","name":"variable.other.makefile","patterns":[{"include":"#variables"},{"match":"\\\\\\\\\\\\n","name":"constant.character.escape.continuation.makefile"}]}]},"braces-interpolation":{"begin":"{","end":"}","patterns":[{"include":"#variables"},{"include":"#interpolation"}]},"builtin-variable-braces":{"patterns":[{"match":"(?<={)(MAKEFILES|VPATH|SHELL|MAKESHELL|MAKE|MAKELEVEL|MAKEFLAGS|MAKECMDGOALS|CURDIR|SUFFIXES|\\\\.LIBPATTERNS)(?=\\\\s*})","name":"variable.language.makefile"}]},"builtin-variable-parentheses":{"patterns":[{"match":"(?<=\\\\()(MAKEFILES|VPATH|SHELL|MAKESHELL|MAKE|MAKELEVEL|MAKEFLAGS|MAKECMDGOALS|CURDIR|SUFFIXES|\\\\.LIBPATTERNS)(?=\\\\s*\\\\))","name":"variable.language.makefile"}]},"comma":{"match":",","name":"punctuation.separator.delimeter.comma.makefile"},"comment":{"begin":"(^[ ]+)?((?<!\\\\\\\\)(\\\\\\\\\\\\\\\\)*)(?=#)","beginCaptures":{"1":{"name":"punctuation.whitespace.comment.leading.makefile"}},"end":"(?!\\\\G)","patterns":[{"begin":"#","beginCaptures":{"0":{"name":"punctuation.definition.comment.makefile"}},"end":"(?=[^\\\\\\\\])$","name":"comment.line.number-sign.makefile","patterns":[{"match":"\\\\\\\\\\\\n","name":"constant.character.escape.continuation.makefile"}]}]},"directives":{"patterns":[{"begin":"^[ ]*([s\\\\-]?include)\\\\b","beginCaptures":{"1":{"name":"keyword.control.include.makefile"}},"end":"^","patterns":[{"include":"#comment"},{"include":"#variables"},{"match":"%","name":"constant.other.placeholder.makefile"}]},{"begin":"^[ ]*(vpath)\\\\b","beginCaptures":{"1":{"name":"keyword.control.vpath.makefile"}},"end":"^","patterns":[{"include":"#comment"},{"include":"#variables"},{"match":"%","name":"constant.other.placeholder.makefile"}]},{"begin":"^\\\\s*(?:(override)\\\\s*)?(define)\\\\s*([^\\\\s]+)\\\\s*(=|\\\\?=|:=|\\\\+=)?(?=\\\\s)","captures":{"1":{"name":"keyword.control.override.makefile"},"2":{"name":"keyword.control.define.makefile"},"3":{"name":"variable.other.makefile"},"4":{"name":"punctuation.separator.key-value.makefile"}},"end":"^\\\\s*(endef)\\\\b","name":"meta.scope.conditional.makefile","patterns":[{"begin":"\\\\G(?!\\\\n)","end":"^","patterns":[{"include":"#comment"}]},{"include":"#variables"},{"include":"#directives"}]},{"begin":"^[ ]*(export)\\\\b","beginCaptures":{"1":{"name":"keyword.control.$1.makefile"}},"end":"^","patterns":[{"include":"#comment"},{"include":"#variable-assignment"},{"match":"[^\\\\s]+","name":"variable.other.makefile"}]},{"begin":"^[ ]*(override|private)\\\\b","beginCaptures":{"1":{"name":"keyword.control.$1.makefile"}},"end":"^","patterns":[{"include":"#comment"},{"include":"#variable-assignment"}]},{"begin":"^[ ]*(unexport|undefine)\\\\b","beginCaptures":{"1":{"name":"keyword.control.$1.makefile"}},"end":"^","patterns":[{"include":"#comment"},{"match":"[^\\\\s]+","name":"variable.other.makefile"}]},{"begin":"^\\\\s*(ifeq|ifneq|ifdef|ifndef)(?=\\\\s)","captures":{"1":{"name":"keyword.control.$1.makefile"}},"end":"^\\\\s*(endif)\\\\b","name":"meta.scope.conditional.makefile","patterns":[{"begin":"\\\\G","end":"^","name":"meta.scope.condition.makefile","patterns":[{"include":"#comma"},{"include":"#variables"},{"include":"#comment"}]},{"begin":"^\\\\s*else(?=\\\\s)\\\\s*(ifeq|ifneq|ifdef|ifndef)*(?=\\\\s)","beginCaptures":{"0":{"name":"keyword.control.else.makefile"}},"end":"^","patterns":[{"include":"#comma"},{"include":"#variables"},{"include":"#comment"}]},{"include":"$self"}]}]},"flavor-variable-braces":{"patterns":[{"begin":"(?<={)(origin|flavor)\\\\s(?=[^\\\\s}]+\\\\s*})","beginCaptures":{"1":{"name":"support.function.$1.makefile"}},"contentName":"variable.other.makefile","end":"(?=})","name":"meta.scope.function-call.makefile","patterns":[{"include":"#variables"}]}]},"flavor-variable-parentheses":{"patterns":[{"begin":"(?<=\\\\()(origin|flavor)\\\\s(?=[^\\\\s)]+\\\\s*\\\\))","beginCaptures":{"1":{"name":"support.function.$1.makefile"}},"contentName":"variable.other.makefile","end":"(?=\\\\))","name":"meta.scope.function-call.makefile","patterns":[{"include":"#variables"}]}]},"function-variable-braces":{"patterns":[{"begin":"(?<={)(subst|patsubst|strip|findstring|filter(-out)?|sort|word(list)?|firstword|lastword|dir|notdir|suffix|basename|addsuffix|addprefix|join|wildcard|realpath|abspath|info|error|warning|shell|foreach|if|or|and|call|eval|value|file|guile)\\\\s","beginCaptures":{"1":{"name":"support.function.$1.makefile"}},"end":"(?=}|((?<!\\\\\\\\)\\\\n))","name":"meta.scope.function-call.makefile","patterns":[{"include":"#comma"},{"include":"#variables"},{"include":"#interpolation"},{"match":"%|\\\\*","name":"constant.other.placeholder.makefile"},{"match":"\\\\\\\\\\\\n","name":"constant.character.escape.continuation.makefile"}]}]},"function-variable-parentheses":{"patterns":[{"begin":"(?<=\\\\()(subst|patsubst|strip|findstring|filter(-out)?|sort|word(list)?|firstword|lastword|dir|notdir|suffix|basename|addsuffix|addprefix|join|wildcard|realpath|abspath|info|error|warning|shell|foreach|if|or|and|call|eval|value|file|guile)\\\\s","beginCaptures":{"1":{"name":"support.function.$1.makefile"}},"end":"(?=\\\\)|((?<!\\\\\\\\)\\\\n))","name":"meta.scope.function-call.makefile","patterns":[{"include":"#comma"},{"include":"#variables"},{"include":"#interpolation"},{"match":"%|\\\\*","name":"constant.other.placeholder.makefile"},{"match":"\\\\\\\\\\\\n","name":"constant.character.escape.continuation.makefile"}]}]},"interpolation":{"patterns":[{"include":"#parentheses-interpolation"},{"include":"#braces-interpolation"}]},"parentheses-interpolation":{"begin":"\\\\(","end":"\\\\)","patterns":[{"include":"#variables"},{"include":"#interpolation"}]},"recipe":{"begin":"^\\\\t([+\\\\-@]*)","beginCaptures":{"1":{"name":"keyword.control.$1.makefile"}},"end":"[^\\\\\\\\]$","name":"meta.scope.recipe.makefile","patterns":[{"match":"\\\\\\\\\\\\n","name":"constant.character.escape.continuation.makefile"},{"include":"#variables"}]},"simple-variable":{"patterns":[{"match":"\\\\$[^(){}]","name":"variable.language.makefile"}]},"target":{"begin":"^(?!\\\\t)([^:]*)(:)(?!=)","beginCaptures":{"1":{"patterns":[{"captures":{"1":{"name":"support.function.target.$1.makefile"}},"match":"^\\\\s*(\\\\.(PHONY|SUFFIXES|DEFAULT|PRECIOUS|INTERMEDIATE|SECONDARY|SECONDEXPANSION|DELETE_ON_ERROR|IGNORE|LOW_RESOLUTION_TIME|SILENT|EXPORT_ALL_VARIABLES|NOTPARALLEL|ONESHELL|POSIX))\\\\s*$"},{"begin":"(?=\\\\S)","end":"(?=\\\\s|$)","name":"entity.name.function.target.makefile","patterns":[{"include":"#variables"},{"match":"%","name":"constant.other.placeholder.makefile"}]}]},"2":{"name":"punctuation.separator.key-value.makefile"}},"end":"[^\\\\\\\\]$","name":"meta.scope.target.makefile","patterns":[{"begin":"\\\\G","end":"(?=[^\\\\\\\\])$","name":"meta.scope.prerequisites.makefile","patterns":[{"match":"\\\\\\\\\\\\n","name":"constant.character.escape.continuation.makefile"},{"match":"%|\\\\*","name":"constant.other.placeholder.makefile"},{"include":"#comment"},{"include":"#variables"}]}]},"variable-assignment":{"begin":"(^[ ]*|\\\\G\\\\s*)([^\\\\s:#=]+)\\\\s*((?<![?:+!])=|\\\\?=|:=|\\\\+=|!=)","beginCaptures":{"2":{"name":"variable.other.makefile","patterns":[{"include":"#variables"}]},"3":{"name":"punctuation.separator.key-value.makefile"}},"end":"\\\\n","patterns":[{"match":"\\\\\\\\\\\\n","name":"constant.character.escape.continuation.makefile"},{"include":"#comment"},{"include":"#variables"}]},"variable-braces":{"patterns":[{"begin":"\\\\${","captures":{"0":{"name":"punctuation.definition.variable.makefile"}},"end":"}|((?<!\\\\\\\\)\\\\n)","name":"string.interpolated.makefile","patterns":[{"include":"#variables"},{"include":"#builtin-variable-braces"},{"include":"#function-variable-braces"},{"include":"#flavor-variable-braces"},{"include":"#another-variable-braces"}]}]},"variable-parentheses":{"patterns":[{"begin":"\\\\$\\\\(","captures":{"0":{"name":"punctuation.definition.variable.makefile"}},"end":"\\\\)|((?<!\\\\\\\\)\\\\n)","name":"string.interpolated.makefile","patterns":[{"include":"#variables"},{"include":"#builtin-variable-parentheses"},{"include":"#function-variable-parentheses"},{"include":"#flavor-variable-parentheses"},{"include":"#another-variable-parentheses"}]}]},"variables":{"patterns":[{"include":"#simple-variable"},{"include":"#variable-parentheses"},{"include":"#variable-braces"}]}},"scopeName":"source.makefile","aliases":["makefile"]}')),a=[e];export{a as default};
