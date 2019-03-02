angular.module('common.srv', ['ngToast', 'oitozero.ngSweetAlert'])
    .service('commonService', ['ngToast', 'SweetAlert',function (ngToast, SweetAlert) {
        this.handlError = function (error) {
            if (error.error_code == 500) {
                this.showFailMessage(error.message);
            }

            if (error.error_code == 403) {
                this.showWarningMessage('Không có quyền thực hiện chức năng này');
            }

            if ( error.error_code == 401) {
                this.showWarningMessage('Hết phiên làm việc. Vui lòng đăng nhập lại!');
                window.location.href = '/login.html';
            }
        }

        this.confirmSweet = function(title, text, confirmAction){
            SweetAlert.swal({
                title: title,
                text: text,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",confirmButtonText: "Đồng ý!",
                cancelButtonText: "Không",
                closeOnConfirm: true,
                closeOnCancel: true }, 
                confirmAction
            );
        }

        this.showSuccessMessage = function(message){                              
            //show message
            ngToast.create({
                className: 'success',
                content: message,
                dismissButton: true,
                timeout: 5000,
                animation: true,
            });
        }

        this.showWarningMessage = function(message){                              
            //show message
            ngToast.create({
                className: 'warning',
                content: message,
                dismissButton: true,
                timeout: 6000,
                animation: true,
            });
        }

        this.showFailMessage = function(message){                              
            //show message
            ngToast.create({
                className: 'danger',
                content: message,
                dismissButton: true,
                timeout: 15000,
                animation: true,
            });
        }
    }]);