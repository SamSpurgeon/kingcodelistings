$(function() {
    var ViewModel = function(){
        var self = this;

        self.editingItem = {
            file: ko.observable([]),
            title: ko.observable(""),
            message: ko.observable(""),
        };

        self.textArea = {
            value: self.editingItem.message,
            height: 300
        },

        self.fileUploaderOptions = {
             selectButtonText: "Select photo",
             multiple: false,
             labelText: "Drag & drop your images here to upload",
             accept: "image/*",
             uploadMode: "useForm",
             value: self.editingItem.file,
         };

        self.title = {
            value: self.editingItem.title
        };

        self.submitClick = function() {
            var file = (self.editingItem.file().length > 0) ? viewModel.editingItem.file()[0] : null;
            sendNeed("POST", self.editingItem.title(), self.editingItem.message(), file);
        };

        function sendNeed(method, title, message, file) {
             var formData = new FormData();
             formData.append("title", title);
             formData.append("message", message);
             //var researchJson = JSON.stringify({ title: title, message: message});

             if(file != null) {
                formData.append('imagefile', file);

                 $.ajax({
                     url: "/api/need",
                     method: method,
                     processData : false,
                     contentType: file ? false :'application/json',
                     data: formData
                 }).done(function () {
                    DevExpress.ui.notify("Done", "Info", 3000)

                    setTimeout(function(){ window.location.reload(); }, 3000);
                 });
             }else{
                DevExpress.ui.notify("Pick an image", "Error", 3000)
             }
        }
    };
    var viewModel = new ViewModel()

    ko.applyBindings(viewModel);
        $(".dx-button-content")
        .html("<img src='img/Upload.png' data-src='img/Upload.png' class='center-block lazyloaded' width='300' height='300'>")
        .addClass("bgc-dark-jungle-green")
        $(".dx-fileuploader-input-label").html("<h5 class='mg-md text-center midLabel'><br>Drag &amp; drop your image</h5>")
});