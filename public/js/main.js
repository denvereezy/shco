$(document).ready(function() {

    $('#alerts').addClass('hidden');
    $(".alert").fadeTo(2000, 500).slideUp(500, function() {
        $(".alert").slideUp(500);
    });

    window.alert = function() {
        $('.alert').show();
        $('#alerts').removeClass('hidden');
    };

    window.goBack = function() {
        window.history.back();
    };

    $("#word_count").on('keyup', function() {
        var words = this.value.match(/\S+/g).length;
        if (words > 50) {
            var trimmed = $(this).val().split(/\s+/, 50).join(" ");
            $(this).val(trimmed + " ");
        } else {
            $('#word_left').text(50 - words);
        };
    });

    window.deleteAttendance = function(id) {
        $('.modal-body').html('<p>Are you sure?</p>');
        $("#form").attr("action", "/attendance/delete/" + id);
    };

    window.deleteExtra = function(id) {
        $('.modal-body').html('<p>Are you sure?</p>');
        $("#form").attr("action", "/delete/payment/" + id);
    };

    setInterval(function() {
        $("#payments_table").load("/payments #payments_table");
    }, 20000);

    window.deletePayment = function(id) {
        $('.modal-body').html('<p>Are you sure?</p>');
        $("#form").attr("action", "/delete/" + id);
    };

    window.deleteStudent = function(id) {
        $('.modal-body').html('<p>Are you sure?</p>');
        $("#form").attr("action", "/student/delete/" + id);
    }

    if ($("input[name='confirmed']")) {
        $("input[name='confirmed']").prop('disabled', true);
        $("input[name='confirmed']").val('Confirmed');
    };
    setInterval(function() {
        $("#rp_table").load("/received-payments #rp_table");
    }, 20000);
});
