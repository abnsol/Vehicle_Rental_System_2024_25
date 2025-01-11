var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const fetchWrapper = (url_1, ...args_1) => __awaiter(void 0, [url_1, ...args_1], void 0, function* (url, options = {}) {
    try {
        const response = yield fetch(url, options);
        if (!response.ok) {
            const errorData = yield response.json();
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get(`content-type`);
        if (contentType && contentType.includes('application/json')) {
            return yield response.json();
        }
        return response;
    }
    catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
});
