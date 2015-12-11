var app = angular.module('KaryalayApp');
  app.controller('karyalayBookCtrl', function ($scope, $uibModal, $log, $http, Flash, Auth, $window, storeKaryalayInfo) {
    $scope.karyalay_lists_id = storeKaryalayInfo.getKaryalayInfo();
    $scope.animationsEnabled = true;
    $scope.events = [];

    $scope.createSuccess = function () {
      var message = '<strong>Package Created!</strong>';
      Flash.create('success', message);
    };

    $scope.createFailure = function () {
      var message = '<strong>Cannot Create Package!</strong> Past Date Package Cannot Be Created';
      Flash.create('danger', message);
    };

    $scope.updateSuccess = function () {
      var message = '<strong>Package Updated!</strong>';
      Flash.create('success', message);
    };

    $scope.updateFailure = function () {
      var message = '<strong>Package Not Updated!</strong> Past Date Package Cannot Be Updated';
      Flash.create('danger', message);
    };

    $scope.deleteSuccess = function() {
      var message = '<strong>Package Deleted!</strong> All the associated details are removed';
      Flash.create('danger', message);
    };

    $scope.slotSelected = function(start, end, jsEvent, view){
      if(start.diff(moment()) < 0){
        $scope.createFailure();
      }else {
        $scope.open(start, end, jsEvent, view, 'lg');
      }
    };

    $scope.checkNotValidTime = function(start_date){
      return moment(new Date()).isAfter(start_date);
    };

    $scope.alertOnEventClick = function(event, jsEvent, view) {
      if(view.name == 'month'){
        $scope.openPast(event, jsEvent, view, 'lg');
      }else{
        if($scope.checkNotValidTime(event.start)){
          $scope.openPast(event, jsEvent, view, 'lg');
        }else{
          $scope.openEdit(event, jsEvent, view, 'lg');
        }
      }
    };

    $scope.updateEventSource = function(event){
      var eventInSource = $scope.findWhere($scope.events, {id: event.id});
      if(eventInSource){
        $('#calendar').fullCalendar( 'updateEvent', event);
        $scope.extend(eventInSource, event);
      }
    };

    $scope.alertOnEventDrop = function(event, delta, revertFunc) {
      var start_date = event.start, end_date = event.end,
      old_event = $scope.where($scope.events, {id: event.id});
      event.all_day = event.allDay;
      if(!end_date) {
        end_date = event.end = event._end = new moment(event.start);
        $scope.extend(event.end, {  _ambigTime: false,
                                    _ambigZone: false,
                                    _fullCalendar: true });
        end_date.add(2, 'hours');
      }
      var old_start_date = $scope.isEmpty(old_event) ? moment() : $scope.first(old_event).start
      if(start_date.diff(moment()) < 0){
        revertFunc();
        $scope.updateFailure();
      }else if(old_start_date.diff(moment()) < 0) {
        revertFunc();
        $scope.updateFailure();
      }else{
        var change_data = {
          from_date: start_date.format(),
          from_time: start_date.toDate(),
          to_time: end_date.toDate(),
          all_day: event.allDay
        }
        var data = {karyalay_package: change_data};
        var url_to_post = '/karyalay_packages/' + event.id;
        $http.put(url_to_post, data)
          .success(function (response) {
            $scope.updateSuccess();
            $scope.updateEventSource(event);
        });
      }
    }

    $scope.uiConfig = {
      calendar:{
        firstDay: new Date().getDay(),
        defaultView: 'agendaWeek',
        height: 'auto',
        slotDuration: '01:00:00',
        selectable: true,
        header:{
          left: 'agendaDay agendaWeek month',
          center: 'title',
          right: 'today prev,next'
        },
        views: {
          agendaWeek: {
            titleFormat: 'MMMM DD, YYYY',
          }
        },
        editable: true,
        timezone: 'local',
        select: $scope.slotSelected,
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnEventDrop,
        eventResize: $scope.alertOnEventDrop
      }
    };

    $scope.openPast = function (event, jsEvent, view, size) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'karyalayPastBooking.html',
        controller: 'BookPastKaryalayModalInstanceCtrl',
        size: size,
        backdrop: 'static',
        resolve: {
          items: function () {
            var items = {
              'event': event,
              'jsEvent': jsEvent,
              'view': view,
              'karyalay_lists_id': $scope.karyalay_lists_id
            };
            return items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem, to_remove) {
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.openEdit = function (event, jsEvent, view, size) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'karyalayBooking.html',
        controller: 'BookEditKaryalayModalInstanceCtrl',
        size: size,
        backdrop: 'static',
        resolve: {
          items: function () {
            var items = {
              'event': event,
              'jsEvent': jsEvent,
              'view': view,
              'karyalay_lists_id': $scope.karyalay_lists_id
            };
            return items;
          }
        }
      });

      $scope.updatePackage = function(selectedItem) {
        $scope.selected = selectedItem;
        var data = {karyalay_package: $scope.extend($scope.selected, {from_date: moment($scope.selected.from_date).format()})};
        var url_to_post = '/karyalay_packages/' + event.id;
        $http.put(url_to_post, data)
          .success(function (response) {
            if(response.status){
              if($scope.selected.subject){
                event.title = $scope.selected.subject;
              }
              event.allDay = $scope.selected.all_day;
              event.start = moment(moment($scope.selected.from_date).format('YYYY-MM-DD') + 'T' + moment($scope.selected.from_time).format('HH:mm'), 'YYYY-MM-DDTHH:mm'),
              event.end = moment(moment($scope.selected.from_date).format('YYYY-MM-DD') + 'T' + moment($scope.selected.to_time).format('HH:mm'), 'YYYY-MM-DDTHH:mm')
              $('#calendar').fullCalendar('updateEvent', event);
            }else{

            }
        });
      };

      $scope.removePackage = function(selectedItem) {
        var url_to_delete = '/karyalay_packages/' + event.id;
        $http.delete(url_to_delete)
          .success(function (response) {
            $('#calendar').fullCalendar('removeEvents',event.id);
            $scope.events.splice($scope.findIndex($scope.events, {id: event.id}), 1);
            $scope.deleteSuccess();
        });
      };

      modalInstance.result.then(function (selectedItem, to_remove) {
        if($scope.isObject(selectedItem)) {
          $scope.updatePackage(selectedItem);
        } else {
          $scope.removePackage(selectedItem);
        }
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.open = function (start, end, jsEvent, view, size) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'karyalayBooking.html',
        controller: 'BookKaryalayModalInstanceCtrl',
        size: size,
        backdrop: 'static',
        resolve: {
          items: function () {
            var items = {
              'start': start,
              'end': end,
              'jsEvent': jsEvent,
              'view': view,
              'karyalay_lists_id': $scope.karyalay_lists_id
            };
            return items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
        var data = {karyalay_package: $scope.extend($scope.selected, {karyalay_lists_id: $scope.karyalay_lists_id,
                                                    from_date: moment($scope.selected.from_date).format()})};
        var url_to_post = '/karyalay_packages';
        $http.post(url_to_post, data)
          .success(function (response) {
            if(response){
              var eventSource = $scope.extend($scope.formatEvent(selectedItem), {id: response.id});
              $scope.events.push(eventSource);
              $scope.createSuccess();
            }else{

            }
        });
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.formatEvent = function(event){
      $scope.extend(event,{
                            id: event.id,
                            title: event.subject,
                            allDay: event.all_day,
                            stick: true,
                            start: moment(moment(event.from_date).format('YYYY-MM-DD') + 'T' + moment(event.from_time).format('HH:mm'), 'YYYY-MM-DDTHH:mm'),
                            end: moment(moment(event.from_date).format('YYYY-MM-DD') + 'T' + moment(event.to_time).format('HH:mm'), 'YYYY-MM-DDTHH:mm')
                          });
      return event;
    };

    $http.get('fetch_karyalay_package', {params: {id: $scope.karyalay_lists_id}})
      .success(function (response) {
        $scope.each(response, function(event){
          $scope.events.push($scope.formatEvent(event));
        });
      });

    $scope.eventSources = [$scope.events];

  });
