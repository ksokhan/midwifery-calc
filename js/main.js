app = {
	$lmp_date: $('#lmp_date'),
	$cycle_length: $('#cycle_length')
}

app.set_result = function(n_rule, gestation) {
	$('#result_edc').html(n_rule)
	$('#result_gst').html(gestation)
}

app.get_gestation = function(lmp) {
	var wks = moment().diff(moment(lmp), 'weeks') + ' weeks'
	var days = moment().diff(moment(lmp), 'days') % 7 + ' days'
	return wks + ", " + days
}

app.calculate = function () {
	var lmp = this.$lmp_date.val()

	// if empty, dont calculate
	if (lmp == '' || lmp == null) return this.set_result('None', 'None')

	var days_to_add = 280 + Number(this.$cycle_length.val()) - 28
	var n_rule = moment(lmp).add('days', days_to_add).format("MMMM Do YYYY")
	var gestation = this.get_gestation(lmp)

	return this.set_result(n_rule, gestation)
}

$('.js_input').on('change keydown', $.proxy(app.calculate, app))
