<?php

namespace App\Utils;

use Illuminate\Support\Facades\Http;

class Elastic
{
    static public function send($index, $type, $object) {
        $uri = "http://elastic:9200/" . $index . "/" . $type . "/" . $object->id;
        $body = $object->toArray();
        $response = Http::post($uri, $body);
    }

    static public function all($index, $type) {
        $uri = "http://elastic:9200/" . $index . "/" . $type . "/_search";
        $response = Http::get($uri);
        return $response->body();
    }

    static public function id($index, $type, $id) {
        $uri = "http://elastic:9200/" . $index . "/" . $type . "/" . $id;
        $response = Http::get($uri);
        return $response->body();
    }

    static public function delete($index, $type, $id) {
        $uri = "http://elastic:9200/" . $index . "/" . $type . "/" . $id;
        $response = Http::delete($uri);
        return $response->body();
    }

}

