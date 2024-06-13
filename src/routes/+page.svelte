<script>
// @ts-nocheck
  export let data;
  let { info } = data;
</script>

<section class="content">
  <h2>基本信息</h2>
  <table>
    <tbody>
      {#each Object.entries(info["基本信息"]) as [key, value]}
        <tr>
          <td>{key}</td>
          <td>
            {#if typeof value === 'object'}
              {#if Object.keys(value).length === 0}
                <!-- 如果值是空对象，则显示空 -->
              {:else}
                <!-- 否则递归展示 -->
                <table>
                  <tbody>
                    {#each Object.entries(value) as [subkey, subvalue]}
                      <tr>
                        <td>{subkey}</td>
                        <td>
                          {#if typeof subvalue === 'object'}
                            {#each Object.entries(subvalue) as [nestedKey, nestedValue]}
                              <div>{nestedKey}: {Array.isArray(nestedValue) ? nestedValue.join(" , ") : nestedValue}</div>
                            {/each}
                          {:else}
                            {subvalue}
                          {/if}
                        </td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              {/if}
            {:else}
              {value}
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <h3>概要</h3>
  <p>{@html info["概要"]}</p>

  <h2>历史背景</h2>
  {#each info["历史背景"] as history}
    <h3>{history.title}</h3>
    <p>{@html history.content}</p>
  {/each}

  <h2>战争过程</h2>
  {#each info["战争过程"] as history}
    <h3>{history.title}</h3>
    <p>{@html history.content}</p>
  {/each}

  <h2>参战兵力</h2>
  <table>
    <thead>
      <tr>
        <th>国家</th>
        <th>主要指挥官</th>
        <th>国家领导人</th>
        <th>投入兵力</th>
      </tr>
    </thead>
    <tbody>
      {#each info.参战兵力.参战国 as country}
        <tr>
          <td>{country.国家}</td>
          <td>
            {#each country.主要指挥官.split(', ') as commander}
              <div>{commander}</div>
            {/each}
          </td>
          <td>
            {#each country.国家领导人.split(', ') as leader}
              <div>{leader}</div>
            {/each}
          </td>
          <td>
            <table>
              <tbody>
                {#each Object.entries(country.投入兵力) as [key, value]}
                  <tr>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <h2>伤亡情况</h2>
  <table>
    <tbody>
      {#each Object.entries(info["伤亡情况"]) as [key, value]}
        <tr>
          <td>{key}</td>
          <td>
            <table>
              <tbody>
                {#each Object.entries(value) as [subkey, subvalue]}
                  <tr>
                    <td>{subkey}</td>
                    <td>{subvalue}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <h2>战争意义</h2>
  <h3>{@html info["战争意义"]}</h3>
</section>
<style>
  .content {
    padding: 10px;
    border-radius: 8px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
  }

  h2 {
    color: #333;
    font-size: 2rem;
    margin-top: 30px;
    margin-bottom: 15px;
    border-bottom: 2px solid #ccc;
    padding-bottom: 5px;
  }

  table {
    width: 100%;
    margin-bottom: 20px;
    border-collapse: collapse;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }

  th {
    background-color: #f0f0f0;
  }

  p {
    text-align: justify;
    margin-bottom: 15px;
    line-height: 1.8;
  }

  .content img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
    margin-bottom: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

</style>