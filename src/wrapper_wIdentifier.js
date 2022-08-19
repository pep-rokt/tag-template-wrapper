var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var _a, sandbox, attributes, accountId, emailPositiveEngagement, pageIdentifier, scripts, sources, roktIntegrationScriptRegexp, launcherScript, _b, _c, launcher_1, selectRoktPlacements, email_1, rest, selection_1, selection;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    console.log("-- Running wrapper script --");
                    _a = window.rokt_config, sandbox = _a.sandbox, attributes = _a.attributes, accountId = _a.accountId, emailPositiveEngagement = _a.emailPositiveEngagement, pageIdentifier = _a.pageIdentifier;
                    scripts = window.document.getElementsByTagName("script");
                    sources = Array.from(scripts);
                    roktIntegrationScriptRegexp = new RegExp("https://apps(-demo|.stage|)?.rokt.com/(wsdk/)?integrations/launcher.js");
                    launcherScript = sources.find(function (source) {
                        return roktIntegrationScriptRegexp.test(source.src);
                    });
                    if (!launcherScript) return [3 /*break*/, 6];
                    _b = window;
                    _c = window.roktCreateLauncher;
                    if (_c) return [3 /*break*/, 2];
                    return [4 /*yield*/, new Promise(function (resolve) {
                            if (window.Rokt) {
                                resolve(window.Rokt.createLauncher);
                            }
                            else {
                                launcherScript.addEventListener("load", function () {
                                    setTimeout(function () { return resolve(window.Rokt.createLauncher); }, 2000);
                                    // resolve(window.Rokt.createLauncher)
                                });
                            }
                        })];
                case 1:
                    _c = (_d.sent());
                    _d.label = 2;
                case 2:
                    _b.roktCreateLauncher = _c;
                    return [4 /*yield*/, window.roktCreateLauncher({
                            accountId: accountId,
                            sandbox: sandbox,
                            integrationName: "google"
                        })];
                case 3:
                    launcher_1 = _d.sent();
                    selectRoktPlacements = function (identifier, attributes) {
                        if (identifier === void 0) { identifier = pageIdentifier; }
                        return identifier
                            ? launcher_1.selectPlacements({
                                identifier: identifier,
                                attributes: attributes
                            })
                            : launcher_1.selectPlacements({
                                attributes: attributes
                            });
                    };
                    if (!emailPositiveEngagement) return [3 /*break*/, 5];
                    email_1 = attributes.email, rest = __rest(attributes, ["email"]);
                    return [4 /*yield*/, selectRoktPlacements(pageIdentifier, rest)];
                case 4:
                    selection_1 = _d.sent();
                    selection_1.on("POSITIVE_ENGAGEMENT").subscribe(function () {
                        selection_1.setAttributes({ email: email_1 });
                        selection_1.unsubscribe();
                    });
                    return [3 /*break*/, 6];
                case 5:
                    selection = selectRoktPlacements(pageIdentifier, attributes);
                    _d.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
})();
