<script setup>
    import markdownit from 'markdown-it'
    import markdownitContainer from 'markdown-it-container'
    import jquery from 'jquery';
    
    const route = useRoute();

    onMounted(() => {
        const $ = jquery;

        useHead({
            title: "Getting Admin On Windows (USB Method)"
        });

        const md = markdownit('default', {
            html: true,
            breaks: true,
            langPrefix: '',
            linkify: true,
            typographer: true
        });

        function renderContainer (tokens, idx, options, env, self) {
            tokens[idx].attrJoin('role', 'alert')
            tokens[idx].attrJoin('class', 'alert')
            tokens[idx].attrJoin('class', `alert-${tokens[idx].info.trim()}`)
            return self.renderToken(...arguments)
        };

        const markdown = $('#doc.markdown-body')

        $.ajax({
            url: `/bypasses/${route.params.platform}/${route.params.name}.md`,
            type: "GET",
            async: true,
            success: function (data) {
                var result = md.render(data);
                markdown.html(result);
            }
        });

        md.use(markdownitContainer, 'success', { render: renderContainer })
        md.use(markdownitContainer, 'info', { render: renderContainer })
        md.use(markdownitContainer, 'warning', { render: renderContainer })
        md.use(markdownitContainer, 'danger', { render: renderContainer })

    })
</script>

<template>
    <div id="navbar">
        <NuxtLink class="navLink" id="homeNav" to="/">
            <span>HOME</span>
        </NuxtLink>

        <div id="rightSide">
            <NuxtLink class="navLink" to="/games">
            <span>GAMES</span>
            </NuxtLink>

            <NuxtLink class="navLink" to="/proxy">
            <span>PROXY</span>
            </NuxtLink>

            <NuxtLink class="navLink" to="/bypasses">
            <span>BYPASSES</span>
            </NuxtLink>
        </div>
    </div>
    <div id="contentee">
        <div id="doc" class="markdown-body container-fluid comment-enabled" data-heard-breaks="true"></div>

        <div class="ui-toc dropup unselectable hidden-print" style="display: none;">
            <div class="pull-right dropdown">
                <a id="tocLabel" class="ui-toc-label btn btn-default" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false" title="Table of content">
                    <i class="fa fa-bars"></i>
                </a>
                <ul id="ui-toc" class="ui-toc-dropdown dropdown-menu" aria-labelledby="tocLabel">
                </ul>
            </div>
        </div>
    </div>
</template>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/octicons/3.5.0/octicons.min.css");
@import url("/css/articlestyle.css");
@import url("/css/customarticlestyle.css");

#doc {
    position: absolute;
    margin-top: 100px;
    right: 50%;
    transform: translateX(50%);
}

#contentee {
    width: 100%;
    height: 100%;
    background-color: white;
}

#homeNav
{
  position: absolute;
  top: 40px;
  left: 60px;
}

#rightSide
{
  display: flex;
  top: 40px;
  position: absolute;
  right: 60px;
  width: 20%;
  justify-content: space-evenly;
}

.navLink
{
  appearance: none;
  text-decoration: none;
  font-size: 14px;
  transition: color .6s cubic-bezier(0.165, 0.84, 0.44, 1);
  font-family: 'Roboto', sans-serif;
  position: relative;
  color: rgb(196, 186, 167);
}

.navLink:hover {
  color: #6754DD;
}

#navbar {
  position: relative;
  z-index: 100;
}

</style>