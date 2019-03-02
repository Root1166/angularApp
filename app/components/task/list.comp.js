angular.module('task-list.comp', ['common.srv']).
component('taskList', {
    templateUrl: '/app/components/task/list.tpl.html',
    controller: ['$routeParams', '$scope', '$rootScope', '$location', 'congviecApi', 'commonService',
        function($routeParams, $scope, $rootScope, $location, congviecApi, commonService) {
            var self = this;
            self.status = $routeParams.status;
            self.taskData1 = [];
            self.taskData2 = [];
            self.taskData3 = [];
            self.currentPage = 1;
            self.pageSize = 50;
            self.totalRowCount = 0;
            self.countRows = 0;
            self.filter = {
                'Status': 0,
                "Search": ' ',
                "Type": null,
                "Start": undefined,
                "End": new Date(),
                "Paging": {
                    "PageSize": self.pageSize,
                    "CurrentPage": self.currentPage,
                }
            };
            this.filterByDate = function(arg1) {
                if (arg1 != undefined) {
                    self.filter.Start = arg1.start;
                    self.filter.End = arg1.end;
                    self.init();
                }
            }
            this.onSearch = function($event) {
                if ($event.keyCode == 13) {
                    self.filter.Search = self.search;
                    self.init();
                }
            }
            switch ($routeParams.status) {
                case 'mytaskcreated':
                    this.pageTitle = 'CÔNG VIỆC CỦA TÔI TẠO';
                    this.filter.Type = 2;
                    break;
                case 'mytask':
                    this.pageTitle = 'DANH SÁCH CÔNG VIỆC ĐƯỢC GIAO';
                    this.filter.Type = 1;
                    break;
                default:
                    this.pageTitle = 'TẤT CẢ';
                    this.filter.Type = null;
                    break;
            }


            this.loadTask1 = function() {
                var filter = {
                    "Status": 1,
                    "Search": self.filter.Search,
                    "Type": self.filter.Type,
                    "Start": self.filter.Start,
                    "End": self.filter.End,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };
                congviecApi.list(filter).then(function(rs) {
                    console.log(rs.data.data.list, "task1");
                    var rs = rs.data;
                    if (rs.result) {
                        self.taskData1 = [];
                        self.taskData1 = rs.data.list;
                    } else {
                        commonService.showWarningMessage(rs.message);
                    }
                }, function(error) {
                    commonService.handlError(error.data);
                });
            }
            this.loadTask2 = async function() {
                var filter = {
                    "Status": 2,
                    "Search": self.filter.Search,
                    "Type": self.filter.Type,
                    "Start": self.filter.Start,
                    "End": self.filter.End,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };
                congviecApi.list(filter).then(function(rs) {
                    console.log(rs.data.data.list, "task2");
                    var rs = rs.data;
                    if (rs.result) {
                        self.taskData2 = [];
                        self.taskData2 = rs.data.list;
                    } else {
                        commonService.showWarningMessage(rs.message);
                    }
                }, function(error) {
                    commonService.handlError(error.data);
                });
            }
            this.loadTask3 = function() {
                var filter = {
                    "Status": 3,
                    "Search": self.filter.Search,
                    "Type": self.filter.Type,
                    "Start": self.filter.Start,
                    "End": self.filter.End,
                    "Paging": {
                        "PageSize": self.pageSize,
                        "CurrentPage": self.currentPage,
                    }
                };
                congviecApi.list(filter).then(function(rs) {
                    console.log(filter, "filter");
                    console.log(rs.data.data.list, "task3");
                    var rs = rs.data;
                    if (rs.result) {
                        self.taskData3 = [];
                        self.taskData3 = rs.data.list;
                    } else {
                        commonService.showWarningMessage(rs.message);
                    }
                }, function(error) {
                    commonService.handlError(error.data);
                });
            }
            this.init = function() {
                self.loadTask1();
                self.loadTask2();
                self.loadTask3();
            }
            this.init();
            self.deleteTask = function(d1) {
                commonService.confirmSweet('Chắc chắn xóa?', 'Bạn sẽ không thể khôi phục bản ghi sau khi xóa!', function(isConfirm) {
                    if (isConfirm) {
                        //remove
                        congviecApi.delete([d1.Id]).then(function(rs) {
                            var rs = rs.data;
                            if (rs.result) {
                                self.filter.Paging.CurrentPage = 1;
                                self.filter.Paging.PageSize = self.pageSize;
                                self.init();
                                //show message
                                commonService.showSuccessMessage('Xóa thành công!');
                                self.init();
                            } else {
                                commonService.showWarningMessage(rs.message);
                            }
                        }, function(error) {
                            commonService.handlError(error.message);
                        });
                    }
                }); //sweet confirm
            }
        }
    ]
});
