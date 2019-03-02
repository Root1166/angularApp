angular.module('uploader.api', ['base.api'])
    .factory('uploaderApi', ['$http', 'baseApi', 'FileUploader', function ($http, baseApi, FileUploader) {
        var headers = { headers: { 'Content-Type': 'application/json' } };
        var uploaderApi = {};
        var base_url = baseApi.getBaseUri().api_url_base;
        var token = baseApi.getToken();
        var self = this;

        uploaderApi.uploader = undefined;

        //manually upload with custom upload path
        uploaderApi.init = function (relative_api_path) {
            uploaderApi.uploader = new FileUploader({
                url: base_url + relative_api_path,
                headers: {
                    Authorization: 'Bearer ' + token.access_token
                }
            });

            uploaderApi.uploader.onCompleteAll = function () {
                uploaderApi.uploader.clearQueue();
                // angular.element("input[type='file']").val(null);
            };
        }

        //auto upload with custom upload path
        uploaderApi.initAuto = function (relative_api_path, call_back_func) {
            uploaderApi.uploader = new FileUploader({
                url: base_url + relative_api_path,
                headers: {
                    Authorization: 'Bearer ' + token.access_token
                },
                autoUpload: true
            });

            uploaderApi.uploader.onCompleteItem = function (item, response, status, headers) {
                if (call_back_func != undefined)
                    call_back_func(response);
            }

            uploaderApi.uploader.onCompleteAll = function () {
                uploaderApi.uploader.clearQueue();
                // angular.element("input[type='file']").val(null);
            };
        }

        //auto upload with default upload file path
        uploaderApi.initDefault = function (call_back_func) {
            uploaderApi.uploader = new FileUploader({
                url: base_url + '/v1/file/upload',
                headers: {
                    Authorization: 'Bearer ' + token.access_token
                },
                autoUpload: true
            });

            uploaderApi.uploader.onCompleteItem = function (item, response, status, headers) {
                if (call_back_func != undefined)
                    call_back_func(response);
            }

            uploaderApi.uploader.onCompleteAll = function () {
                uploaderApi.uploader.clearQueue();
                // angular.element("input[type='file']").val(null);
            };
        }

        uploaderApi.upload = function (call_back_func) {
            uploaderApi.uploader.onCompleteItem = function (item, response, status, headers) {
                if (call_back_func != undefined)
                    call_back_func(response);
            }

            if (uploaderApi.uploader.queue.length == 0)
                alert('Chưa chọn file để upload');

            uploaderApi.uploader.uploadAll();
        }

        return uploaderApi;
    }]);
