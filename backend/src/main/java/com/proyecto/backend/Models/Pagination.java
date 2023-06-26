package com.proyecto.backend.Models;

public class Pagination {
    int numeroPorPagina;
    int skip;
    String busqueda;

    public String getBusqueda() {
        return busqueda;
    }

    public void setBusqueda(String busqueda) {
        this.busqueda = busqueda;
    }

    public int getSkip() {
        return skip;
    }

    public void setSkip(int skip) {
        this.skip = skip;
    }

    public int getNumeroPorPagina() {
        return numeroPorPagina;
    }

    public void setNumeroPorPagina(int numeroPorPagina) {
        this.numeroPorPagina = numeroPorPagina;
    }
}
