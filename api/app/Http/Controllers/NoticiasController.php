<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Noticia;
use App\Jobs\RabbitMQJob;

/**
 * @group Noticias
 */
class NoticiasController extends Controller
{
    /**
     * Noticias
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Noticia::all();
    }

    /**
     * Noticias (id)
     *
     * @urlParam id required ID da Noticia. Example: 1
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $noticia = Noticia::find($id);
        if (!$noticia) {
            $result = [
                'success' => false,
                'message' => 'Notícia não encontrada'
            ];
            return response()->json($result, 404);
        }

        return response()->json($noticia, 200);
    }

    /**
     * Salvar
     *
     * @bodyParam conteudo        string optional Conteúdo. Example: The government has
     * @bodyParam subtitulo       string optional Sub-título. Example: Abbott government
     * @bodyParam fonte           string optional Fonte. Example: The Guardian
     * @bodyParam titulo          string required Fonte. Example: Heatwave frequency
     * @bodyParam data_publicacao string optional Data Publicação. Example: 2014-02-17T14:04:00
     * @bodyParam url             string optional URL. Example:http://www.theguardian.com
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $noticia = $request->json()->all();

        try {
            $noticia = Noticia::create($noticia);
            $result = [
                'success' => true,
                'message' => 'Notícia salva com sucesso'
            ];
            // $noticia->sendToElastic();
            RabbitMQJob::dispatch($noticia->toArray())->onConnection('rabbitmq');
            return response()->json($result, 201);
        } catch (Exception $e) {
            $result = [
                'success' => true,
                'message' => 'Falha ao salvar a notícia',
            	'error'    => $e
            ];
            return response()->json($result, 422);
        }
    }

    /**
     * Salvar em Lote
     *
     */
    public function storeMany(Request $request)
    {
        $noticias = $request->json()->all();

        try {
            foreach ($noticias as $noticia)
            {
                $noticiaSaved = Noticia::create($noticia);
                // $noticiaSaved->sendToElastic();
                RabbitMQJob::dispatch($noticia->toArray())->onConnection('rabbitmq');
            }
            $result = [
                'success' => true,
                'message' => 'Notícias salvas com sucesso'
            ];
            return response()->json($result, 201);
        } catch (Exception $e) {
            $result = [
                'success' => true,
                'message' => 'Falha ao salvar as notícias',
            	'error'    => $e
            ];
            return response()->json($result, 422);
        }
    }

    /**
     * Atualizar
     *
     * @urlParam id required ID da Noticia. Example: 1
     *
     * @bodyParam conteudo        string optional Conteúdo. Example: The government has
     * @bodyParam subtitulo       string optional Sub-título. Example: Abbott government
     * @bodyParam fonte           string optional Fonte. Example: The Guardian
     * @bodyParam titulo          string required Fonte. Example: Heatwave frequency
     * @bodyParam data_publicacao string optional Data Publicação. Example: 2014-02-17T14:04:00
     * @bodyParam url             string optional URL. Example:http://www.theguardian.com
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();

        $noticia = Noticia::find($id);
        if (!$noticia) {
            $result = [
                'success' => false,
                'message' => 'Notícia não encontrada'
            ];
            return response()->json($result, 404);
        }

        $result = $noticia->update($data);
        if (!$result) {
            $result = [
                'success' => false,
                'message' => 'Falha ao atualizar a notícia'
            ];
            return response()->json($result, 422);
        }

        $result = [
            'success' => true,
            'message' => 'Notícia atualizada com sucesso',
        	'data'    => $noticia
        ];
        return response()->json($result, 200);

    }

    /**
     * Deletar
     *
     * @urlParam id required ID da Noticia. Example: 1
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            Noticia::destroy($id);
            $result = [
                'success' => true,
                'message' => 'Notícias deletada com sucesso'
            ];
            return response()->json($result, 200);
        } catch (Exception $e) {
            $result = [
                'success' => true,
                'message' => 'Falha ao deletar a notícia',
            	'error'    => $e
            ];
            return response()->json($result, 400);
        }
    }
}
