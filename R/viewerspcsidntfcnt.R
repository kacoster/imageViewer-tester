#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
viewerspcsidntfcnt <- function(filepath, width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  x = list(
    message = filepath,
    componentID = elementId
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'viewerspcsidntfcnt',
    x,
    width = width,
    height = height,
    package = 'PantheraIDSImageViewer',
    elementId = elementId
  )
}

#' Shiny bindings for viewerspcsidntfcnt
#'
#' Output and render functions for using viewerspcsidntfcnt within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a viewerspcsidntfcnt
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name viewerspcsidntfcnt-shiny
#'
#' @export
viewerspcsidntfcntOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'viewerspcsidntfcnt', width, height, package = 'PantheraIDSImageViewer')
}

#' @rdname viewerspcsidntfcnt-shiny
#' @export
renderViewerspcsidntfcnt <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, viewerspcsidntfcntOutput, env, quoted = TRUE)
}
